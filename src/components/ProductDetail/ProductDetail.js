import React, { Component } from 'react';
import '../ProductDetail/ProductDetail.css';
import { connect } from 'react-redux';
import { addToCart } from '../actions/bcActions';
import { formatPrice, images } from '../utils/BigCUtils';


class ProductDetail extends Component {
    constructor(props) {
        super(props);
        let item;
        let isExistsInCart = true;
        if (this.props.addedItems) {
            item = this.props.addedItems.find(item => this.props.match.params.id === item.id);
        }
        if (!item) {
            item = this.props.items.find(item => this.props.match.params.id === item.id);
            isExistsInCart = false;
        }
        this.state = {
            "item": item,
            "isExistsInCart": isExistsInCart
        };
    }
    render() {
        const item = JSON.parse(JSON.stringify(this.state.item));
        const quantityMgrDOM = this.getQuantityManagerDOM(item, this.state.isExistsInCart);
        return (
            <div className="container">
                <div className="row topRow">

                    <div className="col s6">
                        <img src={images(`./${item.image}`)} className="productDetailItemImage" alt={item.title} />
                    </div>
                    <div className="col s6 detailsCol">
                        <div>{item.brand}</div>
                        <h3 className="titleHeading">{item.title}</h3>
                        <div className="productdetailPrice">{formatPrice(item.price)}</div>
                        <div className="productDetailDesc">{item.description}</div>

                        {quantityMgrDOM}

                    </div>
                </div>
            </div>
        )
    }
    getQuantityManagerDOM = (item, isExistsInCart) => {
        if (!item.quantity) {
            item.quantity = 1;
        }
        return (<div className="row detailsCol">
            <div className="col s6">
                <div className="row cartQty  cartQtyContainer">

                    <div className="col s8 cartQtyNumber">
                        {item.quantity}
                    </div>
                    <div className="col s2 cartQtAction">
                        <div className="incAction" onClick={() => { this.incrementQuantity(item) }}>&#43;</div>

                        <div className="decAction" onClick={() => { this.decrementQuantity(item) }}>&minus;</div>
                    </div>
                </div>
            </div>
            <div className="col s6">
                <div className="productAddToCartAction" onClick={() => { this.handleAddToCart(item) }}>
                    {isExistsInCart ? 'Update in cart' : 'Add to Cart'}</div>
            </div>
        </div>);
    }


    handleAddToCart = (id) => {
        this.props.addToCart(id);
        this.setState({ "isExistsInCart": true });
    }
    incrementQuantity = (item) => {
        item.quantity += 1;
        this.setState(
            { "item": item }
        );
    }
    decrementQuantity = (item) => {
        item.quantity -= 1;
        this.setState(
            { "item": item }
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (id) => { dispatch(addToCart(id)) },
        //    incrementQuantity: (id )=> {dispatch(addToCart(id))},
        //     decrementQuantity: (id) => {dispatch(reduceQuantity(id))},
    }
}
const mapStateToProps = (state) => {
    return {
        items: state.items,
        addedItems: state.addedItems,
        total: state.total
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
