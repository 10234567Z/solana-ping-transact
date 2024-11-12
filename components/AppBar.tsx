import { FC } from "react";
import styles from "../styles/Home.module.css";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import Image from "next/image";
import Link from "next/link";

export const AppBar: FC = () => {
  return (
    <div className={styles.AppHeader}>
      <Image alt="ss" src="/solanaLogo.png" height={30} width={200} />
      <Link href={"/transact"}>
        <p style={{ color: "red", cursor: "pointer", textDecoration: "underline" }}>Transact</p>
      </Link>
      <Link href={"/"}>
        <p style={{ color: "red", cursor: "pointer", textDecoration: "underline" }}>Ping</p>
      </Link>
      <Link href={"/mint"}>
        <p style={{ color: "red", cursor: "pointer", textDecoration: "underline" }}>Mint</p>
      </Link>{" "}
      <WalletMultiButton />
    </div>
  );
};
