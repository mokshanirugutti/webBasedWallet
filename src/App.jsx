import './App.css';
import { useState } from 'react';
import { generateMnemonic } from 'bip39';
import { Toaster, toast } from 'sonner';
import { EthWallet } from './Components/ETHWallet';
import { SolanaWallet } from './Components/SollanaWallet';
import { Copy } from "lucide-react"; 
import ethLogo from './assets/eth-logo.png';
import solLogo from './assets/sol-logo.png';

function App() {
  const [mnemonic, setMnemonic] = useState("");
  const [selectedWallet, setSelectedWallet] = useState(""); 

  const renderMnemonic = () => {
    if (!mnemonic) return null;

    const words = mnemonic.split(' ');  

    return (
      <div className='container'>
        <div className="mnemonic-container">
          {words.map((word, index) => (
            <span key={index} className="mnemonic-word">
              {word}
            </span>
          ))}
        </div>

        <div className="copy-section" onClick={handleCopy}>
          <Copy className="copy-icon" size={24} /> 
          <span className="copy-text">Click To Copy</span>
        </div>
      </div>
    );
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(mnemonic);
      toast.success("Mnemonic phrase copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy mnemonic.");
    }
  };

  const renderWallet = () => {
    if (selectedWallet === "eth") {
      return <EthWallet mnemonic={mnemonic} />;
    } else if (selectedWallet === "sol") {
      return <SolanaWallet mnemonic={mnemonic} />;
    }
  };

  return (
    <div className="app-container">
      <Toaster /> 
      <h1>Web Based Wallet</h1>
      {renderMnemonic()}

      <button className='create-button' onClick={async function () {
        const mn = generateMnemonic();
        setMnemonic(mn);
      }}>
        Create Seed Phrase
      </button>

      <div className="wallet-switch">
        <h1>Select Wallet</h1> 
        <div>

        <img
          src={ethLogo}
          alt="Ethereum"
          className={`wallet-logo ${selectedWallet === "eth" ? "active" : ""}`}
          onClick={() => setSelectedWallet("eth")}
          />
        <img
          src={solLogo}
          alt="Solana"
          className={`wallet-logo ${selectedWallet === "sol" ? "active" : ""}`}
          onClick={() => setSelectedWallet("sol")}
          />
        </div>
      </div>

      <div className="wallet-section">
        {renderWallet()} 
      </div>
    </div>
  );
}

export default App;
