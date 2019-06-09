import Cart from './Cart';
import React, { Component } from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr } from '../utils/BigCUtils';
import { initState } from '../reducers/bcReducer';
import bcReducer from '../reducers/bcReducer';
import { createStore } from 'redux';
import { calculateTotal, formatPrice } from '../utils/BigCUtils';
import { addToCart, reduceQuantity, removeFromCart } from '../actions/bcActions';


const cartItems = [{
    "id": "01",
    "title": "Blue Stripe Stoneware Plate",
    "brand": "Kiriko",
    "price": 40.24,
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus pulvinar, placerat turpis ac, interdum metus. In eget massa sed enim hendrerit auctor a eget.",
    "image": "blue-stripe-stoneware-plate.jpg",
    "quantity": 2
},
{
    "id": "02",
    "title": "Hand Painted Blue Flat Dish",
    "brand": "Kiriko",
    "price": 28,
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at purus pulvinar, placerat turpis ac, interdum metus. In eget massa sed enim hendrerit auctor a eget arcu. Curabitur ac pharetra nisl, sit amet mattis dolor.",
    "image": "hand-painted-blue-flat-dish.jpg",
    "quantity": 3
}];
const cartTotal = calculateTotal(cartItems);

const setUp = (initialState = {}) => {
    const store = createStore(bcReducer, initialState);
    const wrapper = shallow(<Cart store={store}></Cart>).childAt(0).dive();
    return wrapper;
};


describe('Cart Component', () => {

    let wrapper;
    let store;
    beforeEach(() => {
        const initialState = {
            addedItems: cartItems,
            total: cartTotal,
            items: cartItems
        };
        store = createStore(bcReducer, initialState);
        wrapper = shallow(<Cart store={store}></Cart>).childAt(0).dive();
    });

    it('Should render cart item list, without errors', () => {
        let component = findByTestAtrr(wrapper, 'CartComponent');
        expect(component.length).toBe(1);
        component = findByTestAtrr(wrapper, 'CartTable');
        expect(component.length).toBe(1);
        component = findByTestAtrr(wrapper, 'CartHeader');
        expect(component.length).toBe(1);
        component = findByTestAtrr(wrapper, 'CartActions');
        expect(component.length).toBe(1);
        component = findByTestAtrr(wrapper, 'CartDescription');
        expect(component.length).toBe(1);
        component = findByTestAtrr(wrapper, 'CartItemRow');
        expect(component.length).toBe(cartItems.length);

    });
    it('Should render product quantity correctly', () => {
        let elements = wrapper.find('.cartQtyNumber');
        elements.forEach((ele, index) => {
            expect(ele.text()).toBe('' + cartItems[index].quantity);
        })
    });
    it('Should render product total amount correctly', () => {
        let elements = wrapper.find('.productTotalAmt');
        elements.forEach((ele, index) => {
            expect(ele.text()).toBe('' + formatPrice(cartItems[index].quantity * cartItems[index].price));
        });
    });
    it('Should render cart total amount correctly', () => {
        expect(wrapper.find('.cartSubTotal').text()).toBe('' + formatPrice(cartTotal));
    });
    it('Should render cart AA total amount correctly', () => {
        expect(wrapper.find('.cartTotal').text()).toBe(formatPrice(cartTotal) + ' CAD');
    });
    it('Should render increment quantity and amount correctly', () => {
        const classInstance = wrapper.instance();
        classInstance.incrementQuantity("01");
        store = createStore(bcReducer, store.getState());
        wrapper = shallow(<Cart store={store}></Cart>).childAt(0).dive();
        let elements = wrapper.find('.cartQtyNumber');
        elements.forEach((ele, index) => {
            expect(ele.text()).toBe('' + cartItems[index].quantity);
        });
        elements = wrapper.find('.productTotalAmt');
        elements.forEach((ele, index) => {
            expect(ele.text()).toBe('' + formatPrice(cartItems[index].quantity * cartItems[index].price));
        });
    });
    it('Should render decrement in quantity and amount correctly', () => {
        const classInstance = wrapper.instance();
        classInstance.decrementQuantity("01");
        store = createStore(bcReducer, store.getState());
        wrapper = shallow(<Cart store={store}></Cart>).childAt(0).dive();
        let elements = wrapper.find('.cartQtyNumber');
        elements.forEach((ele, index) => {
            expect(ele.text()).toBe('' + cartItems[index].quantity);
        });
        elements = wrapper.find('.productTotalAmt');
        elements.forEach((ele, index) => {
            expect(ele.text()).toBe('' + formatPrice(cartItems[index].quantity * cartItems[index].price));
        });
    });
    it('Should remove product from cart when Quantity reduced to 0', () => {
        const classInstance = wrapper.instance();
        const initProductCount = findByTestAtrr(wrapper, 'CartItemRow').length;
        classInstance.decrementQuantity("01");
        classInstance.decrementQuantity("01");
        store = createStore(bcReducer, store.getState());
        wrapper = shallow(<Cart store={store}></Cart>).childAt(0).dive();
        expect(findByTestAtrr(wrapper, 'CartItemRow').length).toBe(initProductCount - 1);

    });
    it('Should remove product from cart correctly', () => {
        const classInstance = wrapper.instance();
        let initProductCount = findByTestAtrr(wrapper, 'CartItemRow').length;
        classInstance.removeFromCart("02");
        store = createStore(bcReducer, store.getState());
        wrapper = shallow(<Cart store={store}></Cart>).childAt(0).dive();
        expect(findByTestAtrr(wrapper, 'CartItemRow').length).toBe(initProductCount - 1);
    });
});