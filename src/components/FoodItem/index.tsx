import React from 'react';

interface FoodItemProps {
    food: {
        name: string;
        price: number;
    };
    stock: number;
    onBuy: () => void;
}

const FoodItem: React.FC<FoodItemProps> = ({ food, stock, onBuy }) => {
    return (
        <div className="food-item">
            <h3>{food.name}</h3>
            <p>Harga: Rp {food.price}</p>
            <p>Stok: {stock}</p>
            <button className="buy-button" onClick={onBuy} disabled={stock === 0}>
                {stock === 0 ? 'Stok Habis' : 'Beli'}
            </button>
        </div>
    );
};

export default FoodItem;
