import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { BalanceDisplay } from "./BalanceDisplay";
import { CreateMintForm } from "./CreateMint";
import { CreateTokenAccountForm } from "./CreateAccountForm";
import { MintToForm } from "./MintToForm";

export default function MintTokens() {
  const [amount, setAmount] = useState(0);
  const [recipient, setRecipient] = useState("");
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [walletConnected, setWalletConnected] = useState(false);
  const [pingResult, setPingResult] = useState<string | null>(null);

  const transaction = new Transaction();

  useEffect(() => {
    if (publicKey) {
      setWalletConnected(true);
    } else {
      setWalletConnected(false);
    }
  }, [publicKey]);

  useEffect(() => {
    if (amount < 0) {
      setAmount(0);
    }
  }, [amount]);

  return (
    <>
      {walletConnected ? (
        <>
          <BalanceDisplay />
          <CreateMintForm />
          <CreateTokenAccountForm />
          <MintToForm />
        </>
      ) : (
        <div>
          <h2>Connect Wallet to Mint</h2>
        </div>
      )}
    </>
  );
}
