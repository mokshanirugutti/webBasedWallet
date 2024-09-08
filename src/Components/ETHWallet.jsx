import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import { Eye, EyeOff, Copy, Trash } from "lucide-react"; 
import { toast } from "sonner";
import './Wallet.css';

export const EthWallet = ({ mnemonic }) => {
  const [wallets, setWallets] = useState([]); 
  const [showPrivateKeys, setShowPrivateKeys] = useState({});

  const addWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const derivationPath = `m/44'/60'/${wallets.length}'/0'`;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const child = hdNode.derivePath(derivationPath);
    const privateKey = child.privateKey;
    const wallet = new Wallet(privateKey);

    
    setWallets([...wallets, { address: wallet.address, privateKey }]);
  };

  const togglePrivateKey = (index) => {
    setShowPrivateKeys({
      ...showPrivateKeys,
      [index]: !showPrivateKeys[index], 
    });
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy.");
    }
  };

  const deleteWallet = (index) => {
    setWallets(wallets.filter((_, i) => i !== index)); 
    toast.success("Wallet deleted!");
  };

  return (
    <div className="wallet-container">
      <button className="create-button" onClick={addWallet}>
        Add ETH Wallet
      </button>

      {wallets.map((wallet, index) => (
        <div key={index} className="wallet-info">
          <div className="wallet-row">
            <span className="wallet-label">Public Key:</span>
            <span className="wallet-value">{wallet.address}</span>
            <Copy className="icon" onClick={() => copyToClipboard(wallet.address)} />
          </div>

          <div className="wallet-row">
            <span className="wallet-label">Private Key:</span>
            <span className="wallet-value">
              {showPrivateKeys[index] ? wallet.privateKey : "********"}
            </span>
            {showPrivateKeys[index] ? (
              <EyeOff className="icon" onClick={() => togglePrivateKey(index)} />
            ) : (
              <Eye className="icon" onClick={() => togglePrivateKey(index)} />
            )}
            <Copy className="icon" onClick={() => copyToClipboard(wallet.privateKey)} />
          </div>

          <div className="wallet-row">
            <Trash
              className="icon trash-icon"
              onClick={() => deleteWallet(index)}
              style={{ color: 'red' }}
            />
            
          </div>
        </div>
      ))}
    </div>
  );
};
