'use client';

import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

import Image from "next/image";

import Web3 from 'web3';

import { ethers } from 'ethers';

import detectEthereumProvider from '@metamask/detect-provider';


export default function Home() {

  const connectWallet = async () => {
    console.log("Connect Wallet");
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }) as string[];
        console.log("Connected account:", accounts?.[0]);
      } catch (error) {
        console.error("User denied account access", error);
      }
    } else {
      alert("MetaMask not detected. Please install MetaMask.");
    }
  }

  const connectWallet2 = async () => {
    console.log("Connect Wallet 2");
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await web3.eth.getAccounts();
            console.log("Connected account:", accounts[0]);
        } catch (error) {
            console.error("User denied account access", error);
        }
    } else {
        alert("MetaMask not detected.");
    }
  }

  const connectWallet3 = async () => {
    console.log("Connect Wallet 3");
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            console.log("Connected account:", await signer.getAddress());
        } catch (error) {
            console.error("User denied account access", error);
        }
    } else {
        alert("MetaMask not detected.");
    }
  }

  const connectWallet4 = async () => {
    console.log("Connect Wallet 4");
    const provider = await detectEthereumProvider() as MetaMaskInpageProvider;
    if (provider) {
      try {
        await provider.request({ method: 'eth_requestAccounts' });
        const accounts = await provider.request({ method: 'eth_accounts' });
        console.log("Connected account:", accounts);
      } catch (error) {
        console.error("User denied account access", error);
      }
    } else {
      alert("MetaMask not detected.");
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={connectWallet}>Connect Wallet 1</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={connectWallet2}>Connect Wallet 2</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={connectWallet3}>Connect Wallet 3</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={connectWallet4}>Connect Wallet 4</button>
      </main>
    </div>
  )
}
