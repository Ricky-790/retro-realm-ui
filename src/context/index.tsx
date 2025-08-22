import React, {createContext, useContext, useEffect, useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

const GlobalContext = createContext(null);
export const GlobalContextProvider = ({ children }) => {
    const [walletAddress, setWalletAddress] = useState("");

    //Update wallet address / change account/ login
    const updateCurrentWalletAddress = async() => {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setWalletAddress(accounts[0]);
    }
    //call function to login
    // useEffect(() => {
    //     updateCurrentWalletAddress()
    // }, [])
    const setProviderAndSmartContract = async () => {
        const Provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await Provider.getSigner();
    }

    return (
        <GlobalContext.Provider value={{walletAddress, updateCurrentWalletAddress, setWalletAddress}}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext);