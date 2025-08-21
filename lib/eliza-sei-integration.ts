// ElizaOS Sei Integration for Streamixy
import { seiPlugin } from "@elizaos/plugin-sei"

export class StreamixySeiAgent {
  private seiPlugin: any

  constructor() {
    this.seiPlugin = seiPlugin
  }

  // Send SEI tokens to another address
  async sendSeiTokens(toAddress: string, amount: string): Promise<string> {
    try {
      const result = await this.seiPlugin.sendTokens({
        to: toAddress,
        amount: amount,
        denom: "usei", // SEI base denomination
      })

      return `Successfully sent ${amount} SEI to ${toAddress}. Transaction hash: ${result.txHash}`
    } catch (error) {
      return `Failed to send SEI tokens: ${error.message}`
    }
  }

  // Check wallet balance
  async checkWalletBalance(address: string): Promise<string> {
    try {
      const balance = await this.seiPlugin.getBalance(address)
      const seiBalance = (Number.parseInt(balance.amount) / 1000000).toFixed(6) // Convert from usei to SEI

      return `Your wallet contains ${seiBalance} SEI`
    } catch (error) {
      return `Failed to fetch wallet balance: ${error.message}`
    }
  }

  // Query portfolio value (mock implementation)
  async queryPortfolioValue(address: string): Promise<string> {
    try {
      const balance = await this.checkWalletBalance(address)
      // Mock USD conversion (in real implementation, fetch from price API)
      const seiPrice = 0.5 // Mock SEI price in USD
      const seiAmount = Number.parseFloat(balance.split(" ")[3])
      const usdValue = (seiAmount * seiPrice).toFixed(2)

      return `${balance} ($${usdValue} USD)`
    } catch (error) {
      return `Failed to query portfolio value: ${error.message}`
    }
  }
}

// Export for use in Streamixy platform
export const streamixySeiAgent = new StreamixySeiAgent()
