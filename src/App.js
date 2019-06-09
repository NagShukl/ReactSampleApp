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

class App extends Component {
  constructor(props) {
    super(props);
    this.fetchProducts();
  }
  render() {
    return (
      <div className="App" data-test="appComponent">

        <div>
          <BigCNavBar></BigCNavBar>
        </div>
        <div style={{ float: 'none' }}></div>
        <Route path="/cart" render={props => <Cart {...props} />} />
        <Route exact path="/" render={props => <Category {...props} />} />
        <Route path="/product/:id" render={props => <ProductDetail {...props} />} />

      </div>
    );
  }
  fetchProducts = () => {
    // The API where we're fetching data from
    fetch(`http://localhost:3000/products.json`)
      // We get a response and receive the data in JSON format...
      .then(response => response.json())
      // ...then we update the state of our application
      .then(
        data => {
          alert('**JSR,...' + data);
          this.props.loadProducts(data);
          this.setState({
            items: data
          })
        }
      )
      // If we catch errors instead of a response, let's update the app
      .catch(error => { alert('**JSR,...' + error); this.setState({ items: [] }) });
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
const sum = (a, b) => {
  return a + b;
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
// export default App;

