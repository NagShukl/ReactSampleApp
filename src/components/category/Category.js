import React, { Component } from 'react';
import './Category.css';
import Product from "../product/Product";
import Banner from "../banner/Banner";

class Category extends Component {
    render() {
        return (
            <div className="Category">
               <div>
                <Banner category="plates"></Banner>
                </div>
                <div className="productListContainer">
                <Product></Product>
                </div>
            </div>
        );
    }
}

export default Category;
