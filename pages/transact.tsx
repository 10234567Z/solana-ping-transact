import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { AppBar } from "../components/AppBar";
import Head from "next/head";
import { PingButton } from "../components/PingButton";
import WalletContextProvider from "../components/WalletContextProvider";
import Link from "next/link";
import TransactionForm from "../components/TransactionForm";

const Home: NextPage = (props) => {
  return (
    <div className={styles.App}>
      <Head>
        <title>Wallet-Adapter Example</title>
        <meta name="description" content="Wallet-Adapter Example" />
      </Head>
      <WalletContextProvider>
        <AppBar />
        <Link href={"/"}>
          <p style={{ color: "red", cursor: "pointer", textDecoration: "underline" }}>Click here to Ping program</p>
        </Link>
        <div className={styles.AppBody}>
          <TransactionForm />
        </div>
      </WalletContextProvider>
    </div>
  );
};

export default Home;
