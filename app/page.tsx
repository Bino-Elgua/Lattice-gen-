'use client';

import { useState, useEffect } from 'react';
import CookieConsent from '@/components/CookieConsent';
import WalletConnect from '@/components/WalletConnect';
import NFTForm from '@/components/NFTForm';

export default function Home() {
  const [showCookieConsent, setShowCookieConsent] = useState(true);
  const [walletConnected, setWalletConnected] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);
  const [showGenerating, setShowGenerating] = useState(false);
  const [ipfsHashes, setIpfsHashes] = useState<string[]>([]);
  const [showMintSuccess, setShowMintSuccess] = useState(false);

  useEffect(() => {
    // Check if wallet is already connected
    const wallet = localStorage.getItem('wallet');
    if (wallet) {
      const parsed = JSON.parse(wallet);
      if (parsed.connected) {
        setWalletConnected(true);
      }
    }
  }, []);

  const handleCookieAccept = () => {
    setShowCookieConsent(false);
  };

  const handleWalletConnect = () => {
    setWalletConnected(true);
  };

  const handleGenerate = async (collectionName: string, traits: string) => {
    setShowGenerating(true);
    setJobId('mock-job-id');
    
    // Poll for job completion
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch('/api/status/mock-job-id');
        const data = await response.json();
        
        if (data.status === 'complete') {
          clearInterval(pollInterval);
          setIpfsHashes(data.ipfsHashes || []);
          setShowGenerating(false);
        }
      } catch (error) {
        console.error('Error polling status:', error);
      }
    }, 1000);

    // Timeout after 60 seconds
    setTimeout(() => {
      clearInterval(pollInterval);
    }, 60000);
  };

  const handleMint = async () => {
    try {
      const response = await fetch('/api/mint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ipfsHashes }),
      });
      
      const data = await response.json();
      
      if (data.digest) {
        setShowMintSuccess(true);
      }
    } catch (error) {
      console.error('Error minting:', error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Lattice NFT Generator</h1>
        
        {showCookieConsent && <CookieConsent onAccept={handleCookieAccept} />}
        
        <div className="space-y-6">
          {!walletConnected ? (
            <WalletConnect onConnect={handleWalletConnect} />
          ) : (
            <>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-green-600 font-semibold mb-4">✓ Wallet Connected</p>
                <NFTForm onGenerate={handleGenerate} />
              </div>
              
              {showGenerating && (
                <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-8 max-w-md">
                    <p className="text-xl font-semibold mb-4">Generating...</p>
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                  </div>
                </div>
              )}
              
              {ipfsHashes.length > 0 && !showGenerating && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-2xl font-bold mb-4">NFTs Generated!</h2>
                  <p className="mb-4">Generated {ipfsHashes.length} NFTs</p>
                  <button
                    onClick={handleMint}
                    aria-label="Mint NFTs"
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                  >
                    Mint NFTs
                  </button>
                </div>
              )}
              
              {showMintSuccess && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                  <p className="font-bold">Mint successful</p>
                  <p className="text-sm">Your NFTs have been minted successfully!</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
