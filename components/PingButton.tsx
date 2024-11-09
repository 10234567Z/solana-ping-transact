import { FC, useEffect, useState } from "react";
import styles from "../styles/PingButton.module.css";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction, TransactionInstruction } from "@solana/web3.js";

export const PingButton: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [walletConnected, setWalletConnected] = useState(false);
  const [pingResult, setPingResult] = useState<string | null>(null);

  useEffect(() => {
    if (publicKey) {
      setWalletConnected(true);
    } else {
      setWalletConnected(false);
    }
  }, [publicKey]);

  const onClick = async () => {
    try {
      const PROGRAM_ID = new PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa");
      const PROGRAM_DATA_ID = new PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod");
      const transaction = new Transaction();

      const instruction = new TransactionInstruction({
        keys: [{ pubkey: PROGRAM_DATA_ID, isSigner: false, isWritable: true }],
        programId: PROGRAM_ID,
      });

      transaction.add(instruction);

      const signature = await sendTransaction(transaction, connection);
      console.log(signature);

      setPingResult(signature);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={styles.buttonContainer}>
      {walletConnected ? (
        <div className={styles.button} onClick={onClick}>
          Ping
        </div>
      ) : (
        <div className={styles.buttonDisabled}>Connect wallet to use this program</div>
      )}
      {pingResult && walletConnected && (
        <div className={styles.result}>
          Check{" "}
          <a href={`https://explorer.solana.com/tx/${pingResult}?cluster=devnet#ix-3`} target="_blank" rel="noreferrer">
            here
          </a>{" "}
          to see your preious transaction in detail. It might take a second or two to show up.
        </div>
      )}
    </div>
  );
};
