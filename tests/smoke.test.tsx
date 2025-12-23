import { describe, it, expect } from 'vitest'

describe('Smoke Tests', () => {
  it('verifies test setup works', () => {
    // Basic smoke test - verify testing framework is working
    expect(true).toBe(true)
  })

  it('can import homepage module', async () => {
    // Verify the main page module can be imported (catches import errors)
    const module = await import('@/app/page')
    expect(module.default).toBeDefined()
  })
})

