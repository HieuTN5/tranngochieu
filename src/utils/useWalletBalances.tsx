import { useState, useEffect } from 'react';

interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string;
    formatted: string;
}

const useWalletBalances = (): WalletBalance[] => {
    const [balances, setBalances] = useState<WalletBalance[]>([]);

    useEffect(() => {
        const fetchBalances = async () => {
            try {
                const response = await fetch('https://api.example.com/wallet/balances');
                if (!response.ok) {
                    throw new Error('Failed to fetch wallet balances');
                }
                const data = await response.json();
                setBalances(data);
            } catch (error) {
                console.error('Error fetching wallet balances:', error);
            }
        };

        fetchBalances();
        return () => {
        };
    }, []);

    return balances;
};

export default useWalletBalances;