import Cart from './Cart';
import React, { Component } from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr } from '../utils/BigCUtils';
import { initState } from '../reducers/bcReducer';
import bcReducer from '../reducers/bcReducer';
import { createStore } from 'redux';




const setUp = (initialState={}) => {
    const store = createStore(bcReducer);
    const wrapper = shallow(<Cart store={store}></Cart>).childAt(0).dive();
    return wrapper;
};


describe('Cart Component', () => {

    let wrapper;
    beforeEach(() => {
        const initialState = {};        
        wrapper = setUp(initState);
    });

    it('Should render without errors', () => {
        const component = findByTestAtrr(wrapper, 'CartComponent');
        expect(component.length).toBe(1);
    });
    // it('Should render with category error', () => {        
    //     const component = findByTestAtrr(shallow(<Banner category="plates_1"></Banner>), 'BannerComponent-UnknownCategory');
    //     expect(component.length).toBe(1);
    // });
    // it('Should get category data', () => {
    //     const component = wrapper.instance().getCategory('plates');
    //     expect(component).toBeTruthy();
    // });

});