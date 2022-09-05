import React from 'react';
import { useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteItemFromCart } from '../../store/cart/reducer';

import { OrderItem } from '../../components/order-item';
import { Button } from '../../components/button';
import { calcTotalPrice, enumerate } from '../../components/utils';
import './order-page.css';

export const OrderPage = () => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.cart.itemsInCart);

    if(items.length < 1) {
        return <h1>Ваша корзина пуста!</h1>
    }

    const handleClick = () => {
        items.map((game) => {
            dispatch(deleteItemFromCart(game.id))
        })
        alert('вы купили товар')
        
    }

    return (
        <div className="order-page">
            <div className="order-page__left">
                { items.map(game => <OrderItem game={game}/>)}
            </div>
            <div className="order-page__right">
                <div className="order-page__total-price">
                    <span>{ items.length } { enumerate(items.length, ['товар', 'товара', 'товаров'])} на сумму {calcTotalPrice(items)} руб.</span>
                </div>
                <div>
                <Button type='primary' size='m' onClick={handleClick} >
                    Купить
                </Button>
            </div>
            </div>
        </div>
    )
}
