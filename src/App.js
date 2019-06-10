import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import Category from "./components/category/Category";
import Cart from "./components/cart/Cart";
import BigCNavBar from "./components/navBar/Navbar";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import { loadProducts } from './components/actions/bcActions';
import { BrowserRouter as Router } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router data-test="routerComponent">
      <div className="App" data-test="appComponent">
        <div>
          <BigCNavBar data-test="navComponent"></BigCNavBar>
        </div>
        <div className="contentHolder"></div>
        <Route path="/cart" render={props => <Cart {...props} />} />
        <Route exact path="/" render={props => <Category {...props} />} />
        <Route path="/product/:id" render={props => <ProductDetail {...props} />} />
        
      </div>
      </Router>
    );
  }
  componentDidMount() {
    this.fetchProducts();
  }
  fetchProducts = () => {
    fetch(`/products.json`)
      .then(response => response.json())
      .then(
        data => {
          this.props.loadProducts(data);
          this.setState({
            items: data
          })
        }
      )
      .catch(error => { console.log('**Error,...Unable to load Product data!' + error); this.setState({ items: [] }) });
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    loadProducts: (products) => { dispatch(loadProducts(products)) }
  }
}
const mapStateToProps = (state) => {
  return {
    items: state.items
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)

