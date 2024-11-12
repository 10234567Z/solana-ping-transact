import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { FC, useEffect, useState } from "react";

export const BalanceDisplay: FC = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const [balance, setBalance] = useState<number | null>(null);
    
    useEffect(() => {
        connection.getBalance(publicKey).then((balance) => {
        setBalance(balance / LAMPORTS_PER_SOL);
        });
    }, [connection, publicKey]);
    
    return (
        <div>
        <h2>Balance</h2>
        <h4>{balance} SOL</h4>
        </div>
    );
    }