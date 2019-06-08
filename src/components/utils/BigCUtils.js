import plateRightImage from '../../plates-header.jpg';
// import checkPropTypes from 'check-prop-types';
// import { applyMiddleware, createStore } from 'redux';
// import bcReducer from '../reducers/bcReducer';
// import { middlewares } from './../src/createStore';


const BigCUtils = {

    navLinks: [
        { title: 'HOME', path: '/', alt: 'Home' },
        { title: 'SHOP', path: '/shop', alt: 'Shop', subMenu: 'ShopSubMenu' },
        { title: 'JOURNAL', path: '/journal', alt: 'Journal' },
        { title: 'MORE', path: '/more', alt: 'More',  subMenu: 'moreSubMenu' }
    ],
    categoriesBanner: [
        { id:'plates', title: 'Plates', description: 'Some category description here! This is the description for Plates category!', leftImage: '../../jsrImgs/plate-left.png', rightImage: plateRightImage},
        { id:'cups', title: 'cups', description: 'Some category description here! description for cups', leftImage: 'imgpath', rightImage: 'imgPath'},
    ]    
}
// calculate total amount from items in provioded array.
export const calculateTotal= (arr) => {
    let res = arr.reduce((total, ele) => {
        return total += (ele.price * ele.quantity);
    },0);
    return parseFloat(res).toFixed(2);
}
// format amount with 2 floating points
export const formatPrice = (price) => {
    return parseFloat(price).toFixed(2);
}
export const findByTestAtrr = (component, attr) => {
    const wrapper = component.find(`[data-test='${attr}']`);
    return wrapper;
};
export const images = (p) => {
    try {
        let localImage =require.context('../../../public/media', true);
        return localImage(p);
    }catch(e) {
    }
    return p;
}
// var images;


// export const checkProps = (component, expectedProps) => {
//     const propsErr = checkPropTypes(component.propTypes, expectedProps, 'props', component.name);
//     return propsErr;
// };

// export const testStore = (initialState) => {
//     // const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
//     // return createStoreWithMiddleware(bcReducer, initialState);
//     const store = createStore(bcReducer);
// };

export default BigCUtils;