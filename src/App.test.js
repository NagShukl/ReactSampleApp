import App from './App';
import { shallow } from 'enzyme';
import { findByTestAtrr } from './components/utils/BigCUtils';
import { initState } from './components/reducers/bcReducer';
import bcReducer from './components/reducers/bcReducer';
import React from 'react';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';


const items = [{
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

const setUp = (initialState={}) => {
    const store = createStore(bcReducer, initialState);
    const wrapper = shallow(<App store={store}/>).childAt(0).dive();
    // wrapper = wrapper.childAt(0).dive();
    return wrapper;
};


describe('App Component', () => {

    let wrapper;
    beforeEach(() => {
        const initialState = {
            items: items
        }
        wrapper = setUp(initState);
    });

    it('Should render without errors', () => {
        const component = findByTestAtrr(wrapper, 'appComponent');
        expect(component.length).toBe(1);
    });
    it('Should have nav bar', () => {
        const component = findByTestAtrr(wrapper, 'navComponent');
        expect(component.length).toBe(1);
    });
    it('Should have component router', () => {
        const component = findByTestAtrr(wrapper, 'routerComponent');
        expect(component.length).toBe(1);
    });

});