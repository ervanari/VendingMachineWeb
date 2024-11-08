import React, { useState } from 'react';
import FoodItem from "../FoodItem"
import MoneyInput from "../MoneyInput"
import Swal from 'sweetalert2';

interface Food {
    name: string;
    price: number;
    stock: number;
}

const foodList: Food[] = [
    { name: 'Biskuit', price: 6000, stock: 5 },
    { name: 'Chips', price: 8000, stock: 5 },
    { name: 'Oreo', price: 10000, stock: 5 },
    { name: 'Tango', price: 12000, stock: 5 },
    { name: 'Cokelat', price: 15000, stock: 5 },
];

const VendingMachine: React.FC = () => {
    const [balance, setBalance] = useState<number>(0);
    const [stocks, setStocks] = useState<{ [key: string]: number }>(
        foodList.reduce((acc, item) => ({ ...acc, [item.name]: item.stock }), {})
    );

    const insertMoney = (amount: number) => {
        setBalance(balance + amount);
        Swal.fire('Uang Dimasukkan', `Anda memasukkan Rp ${amount}`, 'success');
    };

    const buyItem = (item: Food) => {
        if (balance < item.price) {
            Swal.fire('Saldo tidak cukup', 'Silakan masukkan uang lebih banyak.', 'error');
            return;
        }
        if (stocks[item.name] === 0) {
            Swal.fire('Stok habis', `Item ${item.name} sudah habis.`, 'warning');
            return;
        }
        setBalance(balance - item.price);
        setStocks({ ...stocks, [item.name]: stocks[item.name] - 1 });
        Swal.fire('Pembelian Berhasil', `Anda telah membeli ${item.name}`, 'success');
    };

    const returnChange = () => {
        if (balance === 0) {
            Swal.fire('Tidak ada saldo', 'Tidak ada saldo yang dapat dikembalikan.', 'info');
            return;
        }
        Swal.fire('Pengembalian Saldo', `Saldo sebesar Rp ${balance} telah dikembalikan.`, 'info');
        setBalance(0);
    };

    return (
        <div className="vending-machine">
            <h2>Saldo: Rp {balance}</h2>
            <div className="food-grid">
                {foodList.map((food) => (
                    <FoodItem
                        key={food.name}
                        food={food}
                        stock={stocks[food.name]}
                        onBuy={() => buyItem(food)}
                    />
                ))}
            </div>
            <MoneyInput onInsertMoney={insertMoney} />
            <button className="return-button" onClick={returnChange}>
                Kembalikan Uang
            </button>
        </div>
    );
};

export default VendingMachine;
