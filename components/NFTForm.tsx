'use client';

import { useState } from 'react';

interface NFTFormProps {
  onGenerate: (collectionName: string, traits: string) => void;
}

export default function NFTForm({ onGenerate }: NFTFormProps) {
  const [collectionName, setCollectionName] = useState('');
  const [traits, setTraits] = useState('');
  const [acceptedTC, setAcceptedTC] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptedTC) {
      alert('Please accept the terms and conditions');
      return;
    }

    // Call signature function if available
    if (typeof (window as any).signPersonalMessage === 'function') {
      try {
        await (window as any).signPersonalMessage();
      } catch (error) {
        console.error('Error signing message:', error);
      }
    }

    onGenerate(collectionName, traits);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="collectionName" className="block text-sm font-medium text-gray-700 mb-2">
          Collection Name
        </label>
        <input
          type="text"
          id="collectionName"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
          aria-label="Enter collection name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="My NFT Collection"
          required
        />
      </div>

      <div>
        <label htmlFor="traits" className="block text-sm font-medium text-gray-700 mb-2">
          NFT Traits (comma-separated)
        </label>
        <textarea
          id="traits"
          value={traits}
          onChange={(e) => setTraits(e.target.value)}
          aria-label="Enter NFT traits"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="sword, shield, armor"
          rows={3}
          required
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="tc"
          checked={acceptedTC}
          onChange={(e) => setAcceptedTC(e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          required
        />
        <label htmlFor="tc" className="ml-2 block text-sm text-gray-700">
          I accept the terms and conditions
        </label>
      </div>

      <button
        type="submit"
        aria-label="Generate NFTs"
        className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold"
      >
        Generate NFTs
      </button>
    </form>
  );
}
