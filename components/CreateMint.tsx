import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { FC, useState } from "react";
import styles from "../styles/Home.module.css";
import { MINT_SIZE, TOKEN_PROGRAM_ID, getMinimumBalanceForRentExemptMint, createInitializeMintInstruction } from "@solana/spl-token";
import { Keypair, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

export const CreateMintForm: FC = () => {
  const [txSig, setTxSig] = useState("");
  const [mint, setMint] = useState("");

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const link = () => {
    return txSig ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet` : "";
  };

  const createMint = async (event) => {
    event.preventDefault();
    if (!connection || !publicKey) {
      return;
    }

    const mint = Keypair.generate();

    const lamports = await getMinimumBalanceForRentExemptMint(connection);

    const transaction = new Transaction();

    transaction.add(
      SystemProgram.createAccount({
        fromPubkey: publicKey,
        newAccountPubkey: mint.publicKey,
        lamports,
        space: MINT_SIZE,
        programId: TOKEN_PROGRAM_ID,
      }),
      createInitializeMintInstruction(mint.publicKey, 9, publicKey, null, TOKEN_PROGRAM_ID)
    );

    sendTransaction(transaction, connection, { signers: [mint] }).then((signature) => {
      setTxSig(signature);
      setMint(mint.publicKey.toString());
    });
  };

  return (
    <div>
      <form onSubmit={createMint} className={styles.form}>
        <button type="submit" className={styles.formButton}>
          Create Mint
        </button>
      </form>
      {txSig ? (
        <div style={{ fontSize: "16px" }}>
          <p>Token Mint Address: {mint}</p>
          <p>View your transaction on </p>
          <a href={link()} rel="norefferer" target="_blank">
            Solana Explorer
          </a>
        </div>
      ) : null}
    </div>
  );
};
