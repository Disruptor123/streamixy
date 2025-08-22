

<img width="1515" height="665" alt="snap2" src="https://github.com/user-attachments/assets/0b6ebb61-337a-4c66-a369-2ef61ac23423" />
<img width="1366" height="671" alt="snap5" src="https://github.com/user-attachments/assets/cf666ce4-c66a-4fa4-a660-27ae5cdea5dc" />
<img width="1551" height="738" alt="snap10" src="https://github.com/user-attachments/assets/13725cb3-b1fb-4c84-af76-3ef592af15c1" />
<img width="1549" height="735" alt="snap1" src="https://github.com/user-attachments/assets/a2c22093-a58b-4b02-9577-258d0b5eb3e4" />

Introduction Statement Streamixy is a Web3-powered music AI platform that revolutionizes music ranking by tapping into the voice of the crowd. It scans major social platforms, streaming data, and radio mentions in real time, then publishes a transparent, on-chain global chart. Think of it as the Billboard for the decentralized era driven by data, not deals.

Problem Statement Today’s music charts are often shaped by opaque industry negotiations, selective reporting, and delayed data cycles. Artists without label backing struggle for fair recognition, while fans rarely see how rankings are determined. This lack of transparency erodes trust, limits artist exposure, and fails to reflect true, real-time cultural impact.

Solution Statement Streamixy delivers a trustless, data-driven alternative. Our AI aggregates live music engagement from across social platforms, streaming services, and radio, then anchors the results on-chain for full transparency and immutability. This creates a real-time, global music chart where every rank is verifiable, community-powered, and resistant to manipulation empowering both independent artists and fans to shape music history together.

https://github.com/Disruptor123/streamixy/blob/main/eliza-config.ts

https://github.com/Disruptor123/streamixy/blob/main/StreamToken.json

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

  const handleSendStrm = async () => {
    if (!sendAmount || !sendAddress) return

    setIsTransacting(true)
    try {
      const txHash = await sendTransaction(sendAddress, sendAmount, "0x1C94d3A43fF46d17cb652137FC7B247E0881Ce0D")
      console.log("STRM Transaction sent:", txHash)
      alert(`STRM Transaction sent! Hash: ${txHash}`)
      setSendAmount("")
      setSendAddress("")
    } catch (error) {
      console.error("STRM Send failed:", error)
      alert("STRM Transaction failed")
    } finally {
      setIsTransacting(false)
    }
  }

  const handleStake = async () => {
    if (!stakeAmount) return

    setIsTransacting(true)
    try {
      const txHash = await stakeTokens(stakeAmount)
      console.log("Staking transaction:", txHash)
      alert(`Staking initiated! Hash: ${txHash}`)
      setStakeAmount("")
    } catch (error) {
      console.error("Staking failed:", error)
      alert("Staking failed")
    } finally {
      setIsTransacting(false)
    }
    if (!sendAmount || !sendAddress) return

smartcontract integration : https://github.com/Disruptor123/streamixy/blob/main/app/rewards/page.tsx
