import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, Transaction } from "@solana/web3.js";
import { FC, useState } from "react";
import styles from "../styles/Home.module.css";

import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, createAssociatedTokenAccountInstruction } from "@solana/spl-token";

export const CreateTokenAccountForm: FC = () => {
  const [txSig, setTxSig] = useState("");
  const [tokenAccount, setTokenAccount] = useState("");
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const link = () => {
    return txSig ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet` : "";
  };

  const createTokenAccount = async (event) => {
    event.preventDefault();
    if (!connection || !publicKey) {
      return;
    }

    const transaction = new Transaction();

    const mint = new PublicKey(event.target.mint.value);
    const owner = new PublicKey(event.target.owner.value);

    const associatedToken = await getAssociatedTokenAddress(mint, owner, false, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID);
    transaction.add(createAssociatedTokenAccountInstruction(publicKey, associatedToken, owner, mint, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID));

    sendTransaction(transaction, connection).then((signature) => {
      setTxSig(signature);
      setTokenAccount(associatedToken.toString());
    });
  };

  return (
    <div>
      <br />
        <form onSubmit={createTokenAccount} className={styles.form}>
          <label htmlFor="owner">Token Mint:</label>
          <input id="mint" type="text" className={styles.formField} placeholder="Enter Token Mint" required />
          <label htmlFor="owner">Token Account Owner:</label>
          <input
            id="owner"
            type="text"
            className={styles.formField}
            placeholder="Enter Token Account Owner PublicKey"
            defaultValue={publicKey.toString()}
            required
          />
          <button type="submit" className={styles.formButton}>
            Create Token Account
          </button>
        </form>
      {txSig ? (
        <div style={{ fontSize: "16px" }}>
          <p>Token Account Address: {tokenAccount}</p>
          <p>View your transaction on </p>
          <a href={link()} rel="norefferer" target="_blank">
            Solana Explorer
          </a>
        </div>
      ) : null}
    </div>
  );
};
