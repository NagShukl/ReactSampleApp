import Banner from './Banner';
import React, { Component } from 'react';
import { shallow } from 'enzyme';
import { findByTestAtrr } from '../utils/BigCUtils';

const setUp = (initialState = {}) => {
    const wrapper = shallow(<Banner category="plates"></Banner>);
    return wrapper;
};


describe('Banner Component', () => {

    let wrapper;
    beforeEach(() => {
        const initialState = {};
        wrapper = setUp(initialState);
    });

    it('Should render without errors', () => {
        const component = findByTestAtrr(wrapper, 'BannerComponent');
        expect(component.length).toBe(1);
    });
    it('Should render with category error', () => {
        const component = findByTestAtrr(shallow(<Banner category="plates_1"></Banner>), 'BannerComponent-UnknownCategory');
        expect(component.length).toBe(1);
    });
    it('Should get category data', () => {
        const component = wrapper.instance().getCategory('plates');
        expect(component).toBeTruthy();
    });

});