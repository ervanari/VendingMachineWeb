import React from 'react';

interface MoneyInputProps {
    onInsertMoney: (amount: number) => void;
}

const MoneyInput: React.FC<MoneyInputProps> = ({ onInsertMoney }) => {
    const amounts = [2000, 5000, 10000, 20000, 50000];

    return (
        <div className="money-input">
            <h3>Masukkan Uang:</h3>
            {amounts.map((amount) => (
                <button key={amount} className="money-button" onClick={() => onInsertMoney(amount)}>
                    Rp {amount}
                </button>
            ))}
        </div>
    );
};

export default MoneyInput;
