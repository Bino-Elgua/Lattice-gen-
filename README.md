# Lattice-gen-

NFT Generator for Sui Blockchain - A Next.js application for generating and minting NFTs.

## Features

- Cookie consent modal
- Sui wallet connection
- NFT collection generation with custom traits
- NFT minting functionality
- Full e2e test coverage

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building

```bash
npm run build
npm start
```

### Testing

Install Playwright browsers:

```bash
npx playwright install chromium
```

Run e2e tests:

```bash
npm run test:e2e
```

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── mint/         # Minting endpoint
│   │   └── status/       # Job status endpoint
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Main page
│   └── globals.css       # Global styles
├── components/
│   ├── CookieConsent.tsx # Cookie consent modal
│   ├── WalletConnect.tsx # Wallet connection
│   └── NFTForm.tsx       # NFT generation form
└── tests/
    └── e2e.spec.ts       # E2E test suite
```

## User Flow

1. **Cookie Consent**: User accepts cookie consent on first visit
2. **Wallet Connection**: User connects their Sui wallet
3. **NFT Generation**: User fills form with collection name and traits
4. **Job Polling**: System polls for generation completion
5. **Minting**: User mints the generated NFTs

## API Endpoints

- `POST /api/status/[jobId]` - Update job status
- `GET /api/status/[jobId]` - Get job status
- `POST /api/mint` - Mint NFTs

## Technologies

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS 4
- Playwright for testing