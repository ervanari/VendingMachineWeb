import React, { useState } from 'react';
import FoodItem from "../FoodItem"
import MoneyInput from "../MoneyInput"
import Swal from 'sweetalert2';

interface Food {
    name: string;
    price: number;
    stock: number;
    image: string;
}

const foodList: Food[] = [
    {
        name: 'Biskuit',
        price: 6000,
        stock: 5,
        image: 'https://www.luluhypermarket.com/cdn-cgi/image/f=auto/medias/367318-01.jpg-1200Wx1200H?context=bWFzdGVyfGltYWdlc3wxOTg1ODN8aW1hZ2UvanBlZ3xhRE5pTDJnMFpDOHhNRFk1TnpVMk5UYzVPRFF6TUM4ek5qY3pNVGd0TURFdWFuQm5YekV5TURCWGVERXlNREJJfDAwNTM4YWI1MzAyODBlMzU3YjdkNTJjYThhZmY2MmM0NDA2YjJhODVjMTcwNzEzNDRjYTJhNjQ5MDhiMmUyNzg'
    },
    {
        name: 'Chips',
        price: 8000,
        stock: 5,
        image: 'https://www.luluhypermarket.com/cdn-cgi/image/f=auto/medias/368340-001.jpg-1200Wx1200H?context=bWFzdGVyfGltYWdlc3w3MzQ5MTl8aW1hZ2UvanBlZ3xhR1UyTDJnNVpTOHhNalF3TURBMk1UWTNOelU1T0M4ek5qZ3pOREF0TURBeExtcHdaMTh4TWpBd1YzZ3hNakF3U0F8ZDc1ZmNlNTE2MjkyMzM5OGI3YTBlZmY4MDY4ZGMyZWE2MDYwYjMyNTRhOTJhNjEwMzhjZDFjOGFlOGRjZmJkMw'
    },
    {
        name: 'Oreo',
        price: 10000,
        stock: 5,
        image: 'https://www.luluhypermarket.com/cdn-cgi/image/f=auto/medias/367656-01.jpg-1200Wx1200H?context=bWFzdGVyfGltYWdlc3wxMjM4NjJ8aW1hZ2UvanBlZ3xhRGc0TDJnME9TOHhNRFk1T0RFME1UWTVOakF6TUM4ek5qYzJOVFl0TURFdWFuQm5YekV5TURCWGVERXlNREJJfDVhNWI2MWIzYmE4NzgyMWU0NjE0NjY0YWYzNDUwMWQ0ZGJiNjc1YTI5ZmZiMTE0NmVmMTAzMjkzMmQzZTk0ODU'
    },
    {
        name: 'Tango',
        price: 12000,
        stock: 5,
        image: 'https://www.luluhypermarket.com/cdn-cgi/image/f=auto/medias/367597-001.jpg-1200Wx1200H?context=bWFzdGVyfGltYWdlc3w0NjgzNDZ8aW1hZ2UvanBlZ3xhREF5TDJnNE1pOHhNamMyTVRreU5UVTRNamczT0M4ek5qYzFPVGN0TURBeExtcHdaMTh4TWpBd1YzZ3hNakF3U0F8ZmU5ZWNjOTcyNTdlNGJmZTIwYjI0Y2VmZGUxNmJiMjdkMmJiNWIxNGE3MTBhZTdiYTM0MTMyNDU0NWFhYjczMw'
    },
    {
        name: 'Cokelat',
        price: 15000,
        stock: 5,
        image: 'https://www.luluhypermarket.com/cdn-cgi/image/f=auto/medias/413025-01.jpg-1200Wx1200H?context=bWFzdGVyfGltYWdlc3wxMzE3MTR8aW1hZ2UvanBlZ3xhRGN5TDJoaE5DOHhNRFkxTXprNU5EVTRNakEwTmk4ME1UTXdNalV0TURFdWFuQm5YekV5TURCWGVERXlNREJJfDNjMTkyZDg3MmUyOTFiYzY1ZDFhN2Q2MjUwYjJmMjczZjU3MzFjYTVlZmY2YTI5NzhhZmVhYmE0OTJkODMzMjQ'
    },
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
        <div className="vending-machine colorful-bg">
            <h2 className="balance">Saldo: Rp {balance}</h2>
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
