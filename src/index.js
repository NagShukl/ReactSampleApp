import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import bcReducer from './components/reducers/bcReducer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(bcReducer);

ReactDOM.render(
    <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
 </Provider>
    ,
    document.getElementById('root')
);
