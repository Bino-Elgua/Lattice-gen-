'use client';

interface CookieConsentProps {
  onAccept: () => void;
}

export default function CookieConsent({ onAccept }: CookieConsentProps) {
  return (
    <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md">
        <h2 className="text-2xl font-bold mb-4">Cookie Consent</h2>
        <p className="mb-6 text-gray-700">
          We use cookies to improve your experience on our site. Do you accept cookies?
        </p>
        <button
          onClick={onAccept}
          aria-label="Accept cookies"
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
