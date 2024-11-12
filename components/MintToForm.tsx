import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, Transaction } from "@solana/web3.js";
import { FC, useState } from "react";
import styles from "../styles/Home.module.css";
import { createMintToInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, getAccount } from "@solana/spl-token";

export const MintToForm: FC = () => {
  const [txSig, setTxSig] = useState("");
  const [tokenAccount, setTokenAccount] = useState("");
  const [balance, setBalance] = useState("");
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const link = () => {
    return txSig ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet` : "";
  };

  const mintTo = async (event) => {
    event.preventDefault();
    if (!connection || !publicKey) {
      return;
    }

    const mint = new PublicKey(event.target.mint.value);
    const recipient = new PublicKey(event.target.recipient.value);
    const amount = event.target.amount.value;

    const transaction = new Transaction();
    const associatedToken = await getAssociatedTokenAddress(mint, recipient, false, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID);

    transaction.add(createMintToInstruction(mint, associatedToken, publicKey, amount * LAMPORTS_PER_SOL));

    const signature = await sendTransaction(transaction, connection);
    await connection.confirmTransaction(signature, "confirmed");

    setTxSig(signature);
    setTokenAccount(associatedToken.toString());

    const account = await getAccount(connection, associatedToken);
    setBalance(account.amount.toString());
  };

  return (
    <div>
      <br />
      <form onSubmit={mintTo} className={styles.form}>
        <label htmlFor="mint">Token Mint:</label>
        <input id="mint" type="text" className={styles.formField} placeholder="Enter Token Mint" required />
        <label htmlFor="recipient">Recipient:</label>
        <input id="recipient" type="text" className={styles.formField} placeholder="Enter Recipient PublicKey" required />
        <label htmlFor="amount">Amount Tokens to Mint:</label>
        <input id="amount" type="text" className={styles.formField} placeholder="e.g. 100" required />
        <button type="submit" className={styles.formButton}>
          Mint Tokens
        </button>
      </form>
      {txSig ? (
        <div style={{ fontSize: "16px" }}>
          <p>Token Balance: {balance} </p>
          <p>View your transaction on </p>
          <a href={link()} rel="norefferer" target="_blank">
            Solana Explorer
          </a>
        </div>
      ) : null}
    </div>
  );
};
