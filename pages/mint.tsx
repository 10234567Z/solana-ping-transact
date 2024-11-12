import { NextPage } from "next";
import styles from "../styles/Home.module.css";

import Head from "next/head";
import WalletContextProvider from "../components/WalletContextProvider";
import { AppBar } from "../components/AppBar";
import Link from "next/link";
import MintTokens from "../components/MintTokens";

const Home: NextPage = () => {
  return (
    <div className={styles.App}>
      <Head>
        <title>Wallet-Adapter Example</title>
        <meta name="description" content="Wallet-Adapter Example" />
      </Head>
      <WalletContextProvider>
        <AppBar />
        <div className={styles.AppBody}>
          <MintTokens />
        </div>
      </WalletContextProvider>
    </div>
  );
};

export default Home;
