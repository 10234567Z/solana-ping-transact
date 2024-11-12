import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { useEffect, useState } from "react";
import styles from '../styles/Home.module.css'


export default function TransactionForm() {
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
    if(amount < 0) {
      setAmount(0);
    }
  }, [amount]);

  return (
    <>
      {walletConnected ? (
        <div className={styles.form}>
          <h1>Send Transaction</h1>
          <input className={styles.input} type="number" value={amount} onChange={(e) => setAmount(parseFloat(e.target.value))} placeholder="Amount" />
          <input className={styles.input} type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="Recipient" />
          <button className={styles.formButton}
            onClick={async () => {
              try {
                const transaction = new Transaction().add(
                  SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: new PublicKey(recipient),
                    lamports: amount * LAMPORTS_PER_SOL,
                  })
                );

                const signature = await sendTransaction(transaction, connection);
                console.log(signature);
                setPingResult(signature);
              } catch (e) {
                console.error(e);
              }
            }}

            disabled={amount <= 0 || !recipient}
          >
            Send
          </button>

            {pingResult && walletConnected && (
                <div className={styles.result}>
                Successfully sent {amount} to {recipient}.<br />
                Check{" "}
                <a href={`https://explorer.solana.com/tx/${pingResult}?cluster=devnet#ix-3`} target="_blank" rel="noreferrer">
                    here
                </a>{" "}
                to see your preious transaction in detail. It might take a second or two to show up.
                </div>
            )}
        </div>
      ) : (
        <div>
          <h2>Connect Wallet to Send Transaction</h2>
        </div>
      )}
    </>
  );
}
