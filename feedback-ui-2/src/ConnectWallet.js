import React, { useState } from "react";
import Web3 from "web3";

const ConnectWallet = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);

  const connect = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.enable();
        setWeb3(web3);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error(error);
      }
    } else if (window.web3) {
      // Legacy dapp browsers...
      const web3 = new Web3(window.web3.currentProvider);
      setWeb3(web3);
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
    } else {
      console.error(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  return (
    <div>
    {web3
        ? <button className="connectWalletButton" style={{backgroundColor: "green"}}>{account}</button>
        : <button className="connectWalletButton" style={{backgroundColor: "red"}} onClick={connect}>Connect Wallet</button>
      }
    </div>
  );
};

export default ConnectWallet;
