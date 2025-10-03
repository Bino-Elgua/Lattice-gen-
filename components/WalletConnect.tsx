'use client';

interface WalletConnectProps {
  onConnect: () => void;
}

export default function WalletConnect({ onConnect }: WalletConnectProps) {
  const handleConnect = () => {
    // Mock wallet connection
    localStorage.setItem('wallet', JSON.stringify({ address: '0x123', connected: true }));
    onConnect();
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
      <p className="mb-6 text-gray-700">
        Connect your Sui wallet to generate and mint NFTs.
      </p>
      <button
        onClick={handleConnect}
        aria-label="Connect Sui Wallet"
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
      >
        Connect Sui Wallet
      </button>
    </div>
  );
}
