import { seiPlugin } from "@elizaos/plugin-sei"

export default {
  plugins: [seiPlugin],
  // Sei Network Configuration
  sei: {
    network: "testnet", // "mainnet", "testnet", or "devnet"
    privateKey: process.env.SEI_PRIVATE_KEY,
    rpcUrl: "https://rpc.sei-apis.com", // Sei RPC endpoint
  },
  // Agent Configuration
  agents: [
    {
      name: "StreamixyAgent",
      description: "AI agent for Streamixy platform wallet operations",
      capabilities: ["send_sei_tokens", "check_wallet_balance", "query_portfolio_value"],
    },
  ],
  // Conversation Examples
  examples: [
    {
      user: "Send 1 SEI to 0xD5ca6eA5e33606554F746606157a7512FA738A12",
      assistant: "I'll send 1 SEI token now...",
      action: "send_sei_tokens",
    },
    {
      user: "Send 1 SEI to sei1vpz36punknkdjfs7ew2vkdwws8ydcquy00hhsd",
      assistant: "I'll send 1 SEI token now...",
      action: "send_sei_tokens",
    },
    {
      user: "What's my wallet balance?",
      assistant: "Your wallet contains 10.5 SEI ($5.25 USD)...",
      action: "check_wallet_balance",
    },
  ],
}
