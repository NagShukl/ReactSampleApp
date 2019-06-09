import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';
import { connect } from 'react-redux';
import { addToCart, reduceQuantity, removeFromCart } from '../actions/bcActions';
import { formatPrice, images } from '../utils/BigCUtils';

class Cart extends Component {
    render() {

        return (
            <div className="container" data-test="CartComponent">
                <div className="cartContainer">
                    {this.getCartItemsDOM()}
                </div>
            </div>
        );
    }
    getCartItemsDOM = () => {
        let itemList = this.getItemListDOM();
        let descRow = this.getCartDescriptionDOM();
        let actionRow = this.getActionRowDOM();
        let header = this.getHeaderDOM();
        return (
            <table className="responsive-table" data-test="CartTable">
                {header}
                <tbody>{itemList}{descRow}{actionRow}</tbody>
            </table>
        );
    }
    getItemListDOM = () => {
        return this.props.items.map(item => {
            return (
                <tr key={item.id} data-test="CartItemRow">
                    <td>
                        <div className="listCartItem cartItemImage">
                            <img src={images(`./${item.image}`)} className="cartItemImage" alt={item.title} />
                        </div>
                        <div className="listCartItem cartItemDesc">
                            <div className="cartItemContent">{item.brand}</div>
                            <h3 className="cartItemTitle">{item.title}</h3>

                        </div>
                    </td>
                    <td>
                        <div className="row cartQty">
                            <div className="col s8 cartQtyNumber">
                                {item.quantity}
                            </div>
                            <div className="col s2 cartQtAction">
                                <div data-test="incActionBtn" className="incAction" onClick={() => { this.incrementQuantity(item.id) }}>&#43;</div>

                                <div className="decAction" onClick={() => { this.decrementQuantity(item.id) }}>&minus;</div>
                            </div>
                        </div>
                    </td>
                    <td><div className="cartdetailPrice productTotalAmt">{formatPrice(item.quantity * item.price)}</div></td>
                    <td><div className="removeItemAction" onLoad={this.focus} onClick={() => { this.removeFromCart(item.id) }}>&#215;</div></td>

                </tr>

            )
        });
    }
    getCartDescriptionDOM = () => {
        return (<tr data-test="CartDescription"><td colSpan="4">
            <div className="descRowContainer">
                <div className="row">
                    <div className="col s12">
                        <div className="col s6 desctitle">Cart Overview</div>
                        <div className="col s6 alignRight"></div>
                    </div>
                    <div className="col s12">
                        <div className="col s6 desctitle">SubTotal</div>
                        <div className="col s6 alignRight cartdetailPrice cartSubTotal">{formatPrice(this.props.total)}</div>
                    </div>
                    <div className="col s12">
                        <div className="col s6 desctitle">Total</div>
                        <div className="col s6 alignRight cartdetailPrice cartTotal">{formatPrice(this.props.total)} CAD</div>
                    </div>
                </div>
            </div>
        </td></tr>);
    }
    getHeaderDOM = () => {
        return (<thead data-test="CartHeader">
            <tr>
                <th className="productth">Product</th>
                <th>Quantity</th>
                <th>Total</th>
                <th className="actionth">Action</th>
            </tr>
        </thead>);
    }
    getActionRowDOM = () => {
        return (<tr data-test="CartActions"><td colSpan="4">
            <Link to="/" className="contShopping">CONTINUE SHOPPING</Link>
            <div id="checkout" tabIndex="0"><a href="#!" className="cartCheckoutBtn">
                checkout ($ {formatPrice(this.props.total)})</a>
            </div>
        </td></tr>);
    }
    incrementQuantity = (id) => {
        this.props.incrementQuantity(id);
    }
    decrementQuantity = (id) => {
        this.props.decrementQuantity(id);
    }
    removeFromCart = (id) => {
        this.props.removeFromCart(id);
    }
    componentDidMount() {
        window.document.getElementById("checkout").focus();
        window.document.getElementById("checkout").blur();
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        incrementQuantity: (id) => { dispatch(addToCart(id)) },
        decrementQuantity: (id) => { dispatch(reduceQuantity(id)) },
        removeFromCart: (id) => { dispatch(removeFromCart(id)) }
    }
}
const mapStateToProps = (state) => {
    return {
        items: state.addedItems,
        total: state.total
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
