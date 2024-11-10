import React from 'react';

interface FoodItemProps {
    food: {
        name: string;
        price: number;
        image: string;
    };
    stock: number;
    onBuy: () => void;
}

const FoodItem: React.FC<FoodItemProps> = ({ food, stock, onBuy }) => {
    return (
        <div className="food-item colorful-border">
            <img src={food.image} alt={food.name} className="food-image" />
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
