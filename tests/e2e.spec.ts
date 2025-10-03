import { test, expect } from '@playwright/test';

test('Full user flow', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Handle cookie consent
  await expect(page.locator('.modal')).toBeVisible();
  await page.click('button[aria-label="Accept cookies"]');
  await expect(page.locator('.modal')).not.toBeVisible();

  // Connect wallet (mocked)
  await page.click('button[aria-label="Connect Sui Wallet"]');
  // Mock wallet connection - assumes wallet is connected
  await page.evaluate(() => {
    window.localStorage.setItem('wallet', JSON.stringify({ address: '0x123', connected: true }));
  });

  // Fill form
  await page.fill('input[aria-label="Enter collection name"]', 'Test Collection');
  await page.fill('textarea[aria-label="Enter NFT traits"]', 'sword, shield');
  await page.check('input[id="tc"]');
  
  // Mock signature
  await page.evaluate(() => {
    (window as any).signPersonalMessage = async () => ({ signature: 'mocked-signature' });
  });

  // Trigger generation
  await page.click('button[aria-label="Generate NFTs"]');
  await expect(page.locator('.modal')).toBeVisible();
  await expect(page.locator('text=Generating...')).toBeVisible();

  // Mock job completion
  await page.evaluate(async () => {
    await fetch('/api/status/mock-job-id', { method: 'POST', body: JSON.stringify({ status: 'complete', ipfsHashes: ['ipfs://hash1', 'ipfs://hash2'] }) });
  });

  // Wait for mint button
  await page.waitForSelector('button[aria-label="Mint NFTs"]', { timeout: 60000 });
  await page.click('button[aria-label="Mint NFTs"]');

  // Mock mint response
  await page.evaluate(async () => {
    await fetch('/api/mint', { method: 'POST', body: JSON.stringify({ digest: 'mock-digest' }) });
  });

  // Verify success
  await expect(page.locator('text=Mint successful')).toBeVisible();
});
