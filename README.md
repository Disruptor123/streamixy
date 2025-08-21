Introduction Statement Streamixy is a Web3-powered music AI platform that revolutionizes music ranking by tapping into the voice of the crowd. It scans major social platforms, streaming data, and radio mentions in real time, then publishes a transparent, on-chain global chart. Think of it as the Billboard for the decentralized era driven by data, not deals.

Problem Statement Today’s music charts are often shaped by opaque industry negotiations, selective reporting, and delayed data cycles. Artists without label backing struggle for fair recognition, while fans rarely see how rankings are determined. This lack of transparency erodes trust, limits artist exposure, and fails to reflect true, real-time cultural impact.

Solution Statement Streamixy delivers a trustless, data-driven alternative. Our AI aggregates live music engagement from across social platforms, streaming services, and radio, then anchors the results on-chain for full transparency and immutability. This creates a real-time, global music chart where every rank is verifiable, community-powered, and resistant to manipulation empowering both independent artists and fans to shape music history together.

twitter 
https://github.com/Disruptor123/streamixy/blob/main/app/api/auth/twitter/callback/route.ts

token contract 
Stream token contract:
0x1C94d3A43fF46d17cb652137FC7B247E0881Ce0D

Trade reward address: 
0xDD4170a256dC5B4C5ED32726E0c18FeF50ec6C13

how to check the integration and smart contract functionality

for the connectwallet:
    components/wallet-provider.tsx
    https://github.com/Disruptor123/streamixy/blob/main/components/wallet-provider.tsx

    export default function RewardsPage() {
  const { account, connectWallet, seiBalance, strmBalance, sendTransaction, stakeTokens } = useWallet()
  const [selectedPool, setSelectedPool] = useState<number | null>(null)
  const [sendAmount, setSendAmount] = useState("")
  const [sendAddress, setSendAddress] = useState("")
  const [isTransacting, setIsTransacting] = useState(false)
  const [stakeAmount, setStakeAmount] = useState("")

  const handleSendSei = async () => {
    if (!sendAmount || !sendAddress) return

    setIsTransacting(true)
    try {
      const txHash = await sendTransaction(sendAddress, sendAmount)
      console.log("Transaction sent:", txHash)
      alert(`Transaction sent! Hash: ${txHash}`)
      setSendAmount("")
      setSendAddress("")
    } catch (error) {
      console.error("Send failed:", error)
      alert("Transaction failed")
    } finally {
      setIsTransacting(false)
    }
  }

  const handleSendStrm = async () => {
    if (!sendAmount || !sendAddress) return

smartcontract integration : https://github.com/Disruptor123/streamixy/blob/main/app/rewards/page.tsx
