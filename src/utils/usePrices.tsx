import { useState, useEffect } from 'react';

interface Prices {
    [currency: string]: number;
}

const usePrices = (): Prices => {
    const [prices, setPrices] = useState<Prices>({});

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const response = await fetch('https://api.example.com/prices');
                if (!response.ok) {
                    throw new Error('Failed to fetch prices');
                }
                const data = await response.json();
                setPrices(data);
            } catch (error) {
                console.error('Error fetching prices:', error);
            }
        };

        fetchPrices();
        return () => {
        };
    }, []);

    return prices;
};

export default usePrices;