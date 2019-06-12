import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { formatPrice, images } from '../utils/BigCUtils';
import './CartPopUp.css';
import { connect } from 'react-redux';
import { removeFromCart } from '../actions/bcActions';


 class CartPopUp extends Component{
    
    render(){       
        
        return(
            <div>
                <div className="itemListContainer">
                    {this.getListItems()}
                </div>
                <div>
                    {this.getCartPopUpActionBar()}
                </div>
            </div>
        )
    }
    getListItems = () => {
        return this.props.items.map(item=>{
            return(
                <div className="cartItemContainer" key={item.id}>
                    <div className="listCartItem cartItemImage">
                        <img src={images(`./${item.image}`)} className="cartItemImage" alt={item.title}/>
                    </div>
                    <div className="listCartItem cartItemDesc">
                        <h3 className="cartItemTitle">{item.title}</h3>
                        <div className="cartItemContent">x&nbsp;&nbsp;{item.quantity}</div>
                        <div className="cartItemContent">{item.brand}</div>
                        <p className="cartPrice"><b>{formatPrice(item.price)}</b></p>
                    </div>
                    <div className="listCartItem listCartItemLast" onClick={()=>{this.removeFromCart(item.id)}}>
                    x
                    </div>
                </div>
            )
        });
    }
    getCartPopUpActionBar = () => {
        let actionBar = '';
        if(this.props.items.length > 0) {
        actionBar = <div className="cartPopupActionContainer">
                <div>
                    <div className="cartTotal">Total</div>
                    <div className="cartTotalAmt">{this.props.total}</div>

                </div>
                <div className="clearFloat">
                    <Link to="cart" className={this.getViewCartActionCSS()}>
                        view cart</Link>
                    <a href="#!" className="cartPopupAction">checkout</a>
                </div>
            </div>;
        }
        return actionBar;
    }
    getViewCartActionCSS = () => {
        let res = 'cartPopupAction';
        if(this.props.location.pathname === 'cart') {
            res += ' disableVC';
        }
        return res;
    }
    removeFromCart = (id) => {
        this.props.removeFromCart(id);
    }
}


const mapDispatchToProps= (dispatch)=>{
    return{
       removeFromCart: (id)=>{dispatch(removeFromCart(id))}
         }
    }
const mapStateToProps = (state)=>{
    return {
      items: state.addedItems,
      total: state.total
    }
  }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartPopUp))

