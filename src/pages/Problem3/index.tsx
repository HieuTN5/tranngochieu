


import { useMemo } from "react";
import usePrices from "src/utils/usePrices";
import useWalletBalances from "src/utils/useWalletBalances";
import WalletRow from "./WalletRow";

// First, I saw that WalletBalance and FormattedWalletBalance had the same currency and amount, so I combined them together.

// Current code
/*
interface WalletBalance {
    currency: string;
    amount: number;
}
interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
}
*/
// My Code 
// I export for useWalletBalances
export interface WalletBalance {
    currency: string;
    amount: number;
    formatted: string;
    blockchain: string;
}

// Next I see props has children and rest properties, so I add children to it, and I remove BoxProps

// Current code
/*
interface Props extends BoxProps {

}
*/
// My Code 

interface Props {
    children?: React.ReactNode;
}



//Next I saw that blockchain has type string, so I changed any to string
/*
    // const getPriority = (blockchain: any): number => {
*/
const getPriority = (blockchain: string): number => {
    switch (blockchain) {
        case 'Osmosis':
            return 100
        case 'Ethereum':
            return 50
        case 'Arbitrum':
            return 30
        //Next I saw that Zilliqa and Neo has the same value, so combined them together
        /*
        case 'Zilliqa':
            return 20
        case 'Neo':
            return 20
        */
        case 'Zilliqa':
        case 'Neo':
            return 20
        default:
            return -99
    }
}


// Next I see WalletPage has declared but not exported default
const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    // Next I see useWalletBalances and usePrices are used but not declared, 
    // so I create 2 custom hooks useWalletBalances and usePrices
    const balances = useWalletBalances();
    const prices = usePrices();



    /*
        const sortedBalances = useMemo(() => {
            return balances.filter((balance: WalletBalance) => {

             // Next, I see the balancePriority variable declared but using lhsPriority and this if code is not optimal.
                const balancePriority = getPriority(balance.blockchain);
                if (lhsPriority > -99) {
                    if (balance.amount <= 0) {
                        return true;
                    }
                }
                return false
            }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
                const leftPriority = getPriority(lhs.blockchain);
                const rightPriority = getPriority(rhs.blockchain);
                // I revised the code organization and analysis for ease of use
                if (leftPriority > rightPriority) {
                    return -1;
                } else if (rightPriority > leftPriority) {
                    return 1;
                }
            });
            // I removed princes in dependencies because princes do not affect useMemo
        }, [balances, prices]);
    */
    const sortedBalances = useMemo(() => {
        const filteredBalances = balances.filter(balance => {
            const balancePriority = getPriority(balance.blockchain);
            return balancePriority > -99 && balance.amount <= 0;
        });

        return filteredBalances.sort((lhs: WalletBalance, rhs: WalletBalance) => {
            const leftPriority = getPriority(lhs.blockchain);
            const rightPriority = getPriority(rhs.blockchain);
            return rightPriority - leftPriority;
        });
    }, [balances]);

    // Next I saw formattedBalances declared but not used, so I hid it
    /*
    const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
        return {
            ...balance,
            formatted: balance.amount.toFixed()
        }
    })
    */

    // Next Next, I see that rows are mainly based on sortedBalances and prices, so I use useMemo to optimize
    /*
    const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
            <WalletRow
                className={classes.row}
                key={index}
                amount={balance.amount}
                usdValue={usdValue}
                formattedAmount={balance.formatted}
            />
        )
    })
    */


    const rows = useMemo(() => {
        return sortedBalances.map((balance, index) => {
            const usdValue = prices[balance.currency] * balance.amount;
            return (
                <WalletRow
                    className="row" // Replace with actual class or use CSS-in-JS solution
                    key={index}
                    amount={balance.amount}
                    usdValue={usdValue}
                    formattedAmount={balance.formatted}
                />
            );
        });
    }, [sortedBalances, prices]);

    return (
        <>
            <div {...rest}>
                {rows}
            </div>
            <pre>
                {`               
import { useMemo } from "react";
import usePrices from "src/utils/usePrices";
import useWalletBalances from "src/utils/useWalletBalances";
import WalletRow from "./WalletRow";

// First, I saw that WalletBalance and FormattedWalletBalance had the same currency and amount, so I combined them together.

// Current code
/*
interface WalletBalance {
    currency: string;
    amount: number;
}
interface FormattedWalletBalance {
    currency: string;
    amount: number;
    formatted: string;
}
*/
// My Code 
interface WalletBalance {
    currency: string;
    amount: number;
    formatted: string;
    blockchain: string;
}

// Next I see props has children and rest properties, so I add children to it, and I remove BoxProps

// Current code
/*
interface Props extends BoxProps {

}
*/
// My Code 

interface Props {
    children?: React.ReactNode;
}



//Next I saw that blockchain has type string, so I changed any to string
/*
    // const getPriority = (blockchain: any): number => {
*/
const getPriority = (blockchain: string): number => {
    switch (blockchain) {
        case 'Osmosis':
            return 100
        case 'Ethereum':
            return 50
        case 'Arbitrum':
            return 30
        //Next I saw that Zilliqa and Neo has the same value, so combined them together
        /*
        case 'Zilliqa':
            return 20
        case 'Neo':
            return 20
        */
        case 'Zilliqa':
        case 'Neo':
            return 20
        default:
            return -99
    }
}


// Next I see WalletPage has declared but not exported default
const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    // Next I see useWalletBalances and usePrices are used but not declared, 
    // so I create 2 custom hooks useWalletBalances and usePrices
    const balances = useWalletBalances();
    const prices = usePrices();



    /*
        const sortedBalances = useMemo(() => {
            return balances.filter((balance: WalletBalance) => {

             // Next, I see the balancePriority variable declared but using lhsPriority and this if code is not optimal.
                const balancePriority = getPriority(balance.blockchain);
                if (lhsPriority > -99) {
                    if (balance.amount <= 0) {
                        return true;
                    }
                }
                return false
            }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
                const leftPriority = getPriority(lhs.blockchain);
                const rightPriority = getPriority(rhs.blockchain);
                // I revised the code organization and analysis for ease of use
                if (leftPriority > rightPriority) {
                    return -1;
                } else if (rightPriority > leftPriority) {
                    return 1;
                }
            });
            // I removed princes in dependencies because princes do not affect useMemo
        }, [balances, prices]);
    */
    const sortedBalances = useMemo(() => {
        const filteredBalances = balances.filter(balance => {
            const balancePriority = getPriority(balance.blockchain);
            return balancePriority > -99 && balance.amount <= 0;
        });

        return filteredBalances.sort((lhs: WalletBalance, rhs: WalletBalance) => {
            const leftPriority = getPriority(lhs.blockchain);
            const rightPriority = getPriority(rhs.blockchain);
            return rightPriority - leftPriority;
        });
    }, [balances]);

    // Next I saw formattedBalances declared but not used, so I hid it
    /*
    const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
        return {
            ...balance,
            formatted: balance.amount.toFixed()
        }
    })
    */

    // Next Next, I see that rows are mainly based on sortedBalances and prices, so I use useMemo to optimize
    /*
    const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
            <WalletRow
                className={classes.row}
                key={index}
                amount={balance.amount}
                usdValue={usdValue}
                formattedAmount={balance.formatted}
            />
        )
    })
    */


    const rows = useMemo(() => {
        return sortedBalances.map((balance, index) => {
            const usdValue = prices[balance.currency] * balance.amount;
            return (
                <WalletRow
                    className="row" // Replace with actual class or use CSS-in-JS solution
                    key={index}
                    amount={balance.amount}
                    usdValue={usdValue}
                    formattedAmount={balance.formatted}
                />
            );
        });
    }, [sortedBalances, prices]);

    return (
        <>
            <div {...rest}>
                {rows}
            </div>
            
        </>
    )
}
// My code
export default WalletPage
                `}
            </pre>
        </>
    )
}
// My code
export default WalletPage