import Cart from './Cart';
import React, { Component } from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr } from '../utils/BigCUtils';
import { initState } from '../reducers/bcReducer';
import bcReducer from '../reducers/bcReducer';
import { createStore } from 'redux';
import { calculateTotal, formatPrice } from '../utils/BigCUtils';
import { addToCart, reduceQuantity, removeFromCart } from '../actions/bcActions';


const cartItems =  [{
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

const setUp = (initialState={}) => {
    const store = createStore(bcReducer,initialState);
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
        // wrapper = setUp(initialState);
        store = createStore(bcReducer,initialState);
        wrapper = shallow(<Cart store={store}></Cart>).childAt(0).dive();
        //console.log('**JSR,...+wrapper='+wrapper.debug());
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
        let qs = wrapper.find('.cartQtyNumber');
        qs.forEach((ele, index) => {
            expect(ele.text()).toBe(''+cartItems[index].quantity);
        })
    });
    it('Should render product total amount correctly', () => {
        let qs = wrapper.find('.productTotalAmt');
        qs.forEach((ele, index) => {
            expect(ele.text()).toBe(''+formatPrice(cartItems[index].quantity * cartItems[index].price) );
        });
    });
    it('Should render cart total amount correctly', () => {
        expect(wrapper.find('.cartSubTotal').text()).toBe(''+formatPrice(cartTotal) );
    });
    it('Should render cart AA total amount correctly', () => {
        expect(wrapper.find('.cartTotal').text()).toBe(formatPrice(cartTotal) + ' CAD' );
    });
    fit('Should render cart BB total amount correctly', () => {
        //console.log('**JSR,.... : ',store);
        const initState = [...cartItems];
        const classInstance = wrapper.instance();
        console.log('111111qqq '+cartItems[0].quantity);
        const newValue = classInstance.incrementQuantity("01");
        // const newValue_1 = classInstance.decrementQuantity("01");
        // store.dispatch(addToCart("01")); 
        let xx = store.getState();
        console.log('ZZZZ ',store.getState());
        store = createStore(bcReducer, store.getState());
        wrapper = shallow(<Cart store={store}></Cart>).childAt(0).dive();
        // wrapper.update();
        
        // let qs = wrapper.find('.cartQtyNumber');
        //     qs.forEach((ele, index) => {
        //         console.log('**JSR,....qqAA '+ele.text());
        //         // expect(ele.text()).toBe(''+cartItems[index].quantity);
        //     })



        // store.dispatch(actions.fetchTodos()).then(() => {
        //     // return of async actions
        //     expect(store.getActions()).toEqual(expectedActions)
        //   })
        // console.log('---->>>> ',classInstance.props.dispatch);
        let qs = wrapper.find('.cartQtyNumber');
        qs.forEach((ele, index) => {
            console.log('**JSR,AQAQ..qqAA SS: '+index+' : '+ele.text()+' : '+(cartItems[index].quantity+1));
            if(cartItems[index].id === '01') {
                console.log('111111 AQAQ '+ele.text()+' : '+cartItems[index].quantity);
                expect(ele.text()).toBe(''+(initState[index].quantity+1));
            }
           
        })
        // expect(11).toBe(1);
        //expect(wrapper.find('.cartTotal').text()).toBe(formatPrice(cartTotal) + ' CAD' );
    });
    // it('Should render cart list', () => {
    //     const component = findByTestAtrr(wrapper, 'CartTable');
    //     expect(component.length).toBe(1);
    // });
    // it('Should render with category error', () => {        
    //     const component = findByTestAtrr(shallow(<Banner category="plates_1"></Banner>), 'BannerComponent-UnknownCategory');
    //     expect(component.length).toBe(1);
    // });
    // it('Should get category data', () => {
    //     const component = wrapper.instance().getCategory('plates');
    //     expect(component).toBeTruthy();
    // });

});