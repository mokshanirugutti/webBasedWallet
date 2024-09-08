import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { Eye, EyeOff, Copy, Trash } from "lucide-react"; 
import { toast } from "sonner"; 
import './Wallet.css'; 

export function SolanaWallet({ mnemonic }) {
  const [wallets, setWallets] = useState([]); 
  const [showPrivateKeys, setShowPrivateKeys] = useState({});

  const addWallet = async () => {
    // Step 1: Get the seed from the mnemonic
    const seed = await mnemonicToSeed(mnemonic);

    // Step 2: Derive the path and get the key
    const path = `m/44'/501'/${wallets.length}'/0'`; 
    const derivedSeed = derivePath(path, seed.toString("hex")).key;

    // Step 3: Generate keypair from the derived seed
    const naclKeypair = nacl.sign.keyPair.fromSeed(derivedSeed);
    const secretKey = naclKeypair.secretKey;
    const solanaKeypair = Keypair.fromSecretKey(secretKey);

    // Step 4: Add the wallet to state
    setWallets([
      ...wallets,
      {
        publicKey: solanaKeypair.publicKey.toBase58(),
        privateKey: Buffer.from(secretKey).toString('hex'),
      },
    ]);
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
      <button onClick={addWallet} className="create-button">
        Add Solana wallet
      </button>

      {wallets.map((wallet, index) => (
        <div key={index} className="wallet-info">
          <div className="wallet-row">
            <span className="wallet-label">Public Key:</span>
            <span className="wallet-value">{wallet.publicKey}</span>
            <Copy className="icon" onClick={() => copyToClipboard(wallet.publicKey)} />
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
            />
          </div>
        </div>
      ))}
    </div>
  );
}
