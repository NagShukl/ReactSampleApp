import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Product.css';
import { connect } from 'react-redux';
import { addToCart } from '../actions/bcActions';
import { formatPrice, images } from '../utils/BigCUtils';


 class Product extends Component{
     
    render(){
        let itemList = this.props.items.map(item=>{
            return(
                <div className="productListItem" key={item.id}>
                        <div className="card-image">
                            <img src={images(`./${item.image}`)} className="productImage" alt={item.title}/>
                            <div className="productOverlay">
                            <Link to={`/product/${ item.id }`}>
                                <div className="overlayActionText">View Details</div>
                            </Link>
                                <div className="overlayActionText" onClick={()=>{this.handleAddToCart(item.id)}}>Add to Cart</div>
                            </div>
                            <div className="productItemDetails">
                            
                                <span className="productCardContent">{item.brand}</span>
                                <h3 className="productTitle">{item.title}</h3>
                                <p className="productCardContent productPrice"><b>{formatPrice(item.price)}</b></p>
                            </div>
                        </div>
                 </div>
            )
        })
        return(
            <div className="container">
                <div className="box">
                    {itemList}
                </div>
            </div>
        )
    }
    handleAddToCart = (id) => {
       this.props.addToCart(id);
    }    
}

const mapDispatchToProps= (dispatch)=>{
    return{
       addToCart: (id)=>{dispatch(addToCart(id))}
         }
    }
const mapStateToProps = (state)=>{
    return {
      items: state.items,
      total: state.total
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Product)


