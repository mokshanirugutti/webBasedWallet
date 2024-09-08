# **Web Based Wallet App**

## **Overview**

This project is a **React** web application that allows users to generate Ethereum and Solana wallets from a seed phrase (mnemonic). Users can create multiple wallets, view both the public and private keys, and delete wallets. The private keys are hidden by default for security reasons, and can be revealed using a toggle function. Users can also copy the keys to the clipboard with a single click, and all interactions are accompanied by toast notifications using **sonner**.

## **Features**

- **Seed Phrase Generation:** Generate a BIP-39 compliant seed phrase (mnemonic).
- **Ethereum Wallets:**
  - Create an Ethereum wallet from the seed phrase using the **Ethers.js** library.
  - View public and private keys.
  - Copy public or private keys to the clipboard.
  - Toggle visibility of private keys.
  - Delete individual wallets.
- **Solana Wallets:**
  - Create a Solana wallet from the seed phrase using **nacl** and **Solana web3.js**.
  - Same key display, copy, toggle, and deletion functionality as Ethereum wallets.
- **Toast Notifications:** Get real-time notifications using **sonner** when copying keys or deleting wallets.
- **Responsive UI:** Clean, user-friendly UI built with CSS and React.

## **Technologies Used**

- **React:** JavaScript library for building the user interface.
- **Ethers.js:** For Ethereum wallet generation and key management.
- **Solana Web3.js:** For Solana wallet generation and key management.
- **BIP-39:** For mnemonic (seed phrase) generation.
- **TweetNaCl.js:** Cryptographic library for Solana key pair generation.
- **Sonner:** Lightweight library for toast notifications.
- **Lucide-React:** Icon library for Eye, EyeOff, Copy, and Trash icons.

## **Installation**

### Prerequisites
Make sure you have **Node.js** and **npm** installed. You can download them [here](https://nodejs.org/).

### Steps

1. **Clone the repository:**

   ```bash
   git clonehttps://github.com/mokshanirugutti/webBasedWallet.git
   cd wallet-generator-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the application:**

   ```bash
   npm start
   ```

   This will start the development server at `http://localhost:3000`.

## **Usage**

1. **Generate Seed Phrase:**
   - Click the "Create Seed Phrase" button to generate a new mnemonic (seed phrase). 
   - The seed phrase will be displayed in a bordered container, with an option to copy it to the clipboard.

2. **Create Wallets:**
   - Click the Ethereum or Solana wallet logo to switch between wallet types.
   - Click the "Add ETH Wallet" or "Add Solana Wallet" button to generate wallets.
   - The public and private keys for the newly generated wallet will be displayed below the button.

3. **Copy Keys:**
   - Click the copy icon next to any public or private key to copy it to the clipboard. You will see a success notification.

4. **Toggle Private Key Visibility:**
   - By default, private keys are hidden (represented by `*******`). Click the **Eye** icon to reveal the private key and **EyeOff** to hide it again.

5. **Delete Wallets:**
   - Click the **Trash** icon to delete a wallet. You will see a toast notification confirming the deletion.

