import { 
  useConnect, 
  useAccount, 
  InjectedConnector, 
  chain,
  useBalance,
  useContractRead, //tambahkan library useContractRead
  useContractWrite //tambahkan library useContractWrite
} from "wagmi";
import { useState } from "react";
import { hrABI, contractAddress } from "./ABI/contractABI"; //import hrABI dan contractAddress

const metamaskConnector = new InjectedConnector({
  chains: [chain.kovan.id], 
})

function App() {
  const [connectResult, connect] = useConnect();
  const [accountResult, disconnect] = useAccount();
  const [etherBalance] = useBalance({
    addressOrName: accountResult.data?.address
  })
  const [linkBalance] = useBalance({
    addressOrName: accountResult.data?.address,
    token: "0xa36085F69e2889c224210F603D836748e7dC0088"
  })

  //Tambahkan inisialisasi hook untuk memanggil fungsi read pada smart contract berikut ini
  const [messageResult, getMessage]  = useContractRead({
    addressOrName: contractAddress,
    contractInterface: hrABI
  }, 'getMessage')
  //----------------------------------------------------------------------------------------
  
  //Tambahkan variabel message
  const [message, setMessage] = useState('')
  //--------------------------

  //Tambahkan inisialisasi hook untuk memanggil fungsi write pada smart contract berikut ini
  const [changeMessageResult, changeMessage]  = useContractWrite({
    addressOrName: contractAddress,
    contractInterface: hrABI,
    // signerOrProvider: signer
  }, 'setMessage', {
    args: [
      message
    ]
  })
  //----------------------------------------------------------------------------------------

  const [error, setError] = useState("");

  const connectMetamask = async() => {
    try{
      const result = await connect(metamaskConnector)
      if(result.data.chain.unsupported){
        throw new Error("Network is not supported!")
      }
    } catch (err) {
      setError(err.message)
    }
  }

  //Tambahkan fungsi untuk memanggil changeMessage() yang akan mentrigger hook useContractWrite
  const handleChangeMessage = async() => {
    await changeMessage()
  }

  return (
    <div>
      {connectResult.data.connected ? 
        <div>
          <p>Account: {accountResult.data.address}</p>
          <p>Error: {error ? error : "none"}</p>
          <p>ETH Balance: {etherBalance.data?.formatted} {etherBalance.data?.symbol}</p>
          <p>LINK Balance: {linkBalance.data?.formatted} {linkBalance.data?.symbol}</p>
          {/* Tambahkan kode berikut untuk menampilkan balance */}
          <p>Message: {messageResult.data}</p>
          <input type={'text'} onChange={e => setMessage(e.target.value)}/>
          <button onClick={async() => await changeMessage()}>Change Message</button>
          <button onClick={getMessage}>Refresh Message</button>
          <br />
          <br />
          {/* -------------------------------------------------- */}
          <button onClick={disconnect}>Disconnect</button>
        </div> 
        : 
        <button onClick={connectMetamask}>Connect Wallet</button>
      }
    </div>
  );
}

export default App;
