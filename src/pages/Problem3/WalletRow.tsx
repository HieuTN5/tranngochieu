import React from 'react';

interface WalletRowProps {
    className: string;
    amount: number;
    usdValue: number;
    formattedAmount: string;
}

const WalletRow: React.FC<WalletRowProps> = ({ className, amount, usdValue, formattedAmount }) => {
    return (
        <div className={className}>
            <div className="amount">{formattedAmount}</div>
            <div className="usd-value">${usdValue.toFixed(2)}</div>
            <div className="details">
                <span>Amount: {amount}</span>
            </div>
        </div>
    );
};
export default WalletRow;