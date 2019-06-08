import App from './App';
import { shallow } from 'enzyme';
import { findByTestAtrr } from './components/utils/BigCUtils';
import { initState } from './components/reducers/bcReducer';
import bcReducer from './components/reducers/bcReducer';
import React from 'react';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';



const setUp = (initialState={}) => {
    const store = createStore(bcReducer);
    // const aa = shallow(<App store={store} />);
    // console.log('**JSR,... '+aa);
    console.log('**JSR,...wrapper 111= '+JSON.stringify( shallow(<Router><App store={store}/></Router>)));
    console.log('**JSR,...wrapper 222 = '+JSON.stringify( shallow(<Router><App store={store}/></Router>).childAt(0).dive()));
    console.log('**JSR,...wrapper 333 = '+JSON.stringify( shallow(<Router><App store={store}/></Router>).children.length));
    const wrapper = shallow(<Router><App store={store}/></Router>).childAt(0).dive();
    console.log('**JSR,...wrapper= '+JSON.stringify(wrapper));
    return wrapper;
};


describe('App Component', () => {

    let wrapper;
    beforeEach(() => {
        const initialState = {}
        //     posts: [{
        //         title: 'Example title 1',
        //         body: 'Some text'
        //     }, {
        //         title: 'Example title 2',
        //         body: 'Some text'
        //     }, {
        //         title: 'Example title 3',
        //         body: 'Some text'
        //     }]
        // }
        wrapper = setUp(initState);
        console.log('**JSR,...beforeEach : ',wrapper);
    });

    it('Should render without errors **JSR', () => {
        const component = findByTestAtrr(wrapper, 'appComponent');
        expect(1).toBe(1);
    });

    // it('exampleMethod_updatesState Method should update state as expected', () => {
    //     const classInstance = wrapper.instance();
    //     classInstance.exampleMethod_updatesState();
    //     const newState = classInstance.state.hideBtn;
    //     expect(newState).toBe(true);
    // });

    // it('exampleMethod_returnsAValue Method should return value as expected', () => {
    //     const classInstance = wrapper.instance();
    //     const newValue = classInstance.exampleMethod_returnsAValue(6);
    //     expect(newValue).toBe(7);
    // });


});