import { 
  useConnect, 
  useAccount, 
  InjectedConnector, 
  chain
} from "wagmi";
import { useState } from "react";

const metamaskConnector = new InjectedConnector({
  chains: [chain.kovan.id], 
})

function App() {
  const [connectResult, connect] = useConnect();
  const [accountResult, disconnect] = useAccount();
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

  return (
    <div>
      {connectResult.data.connected ? 
        <div>
          <p>Account: {accountResult.data.address}</p>
          <p>Error: {error ? error : "none"}</p>
          <button onClick={disconnect}>Disconnect</button>
        </div> : 
        <button onClick={connectMetamask}>Connect Wallet</button>
      }
    </div>
  );
}

export default App;
