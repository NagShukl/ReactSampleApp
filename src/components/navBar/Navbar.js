import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import logo from '../../jsrImgs/bc-logo-bright.svg';
import BigCUtils from '../utils/BigCUtils';
import CartPopUp from "../cartPopUp/CartPopUp";
import "./navBar.css";



class BigCNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "showHideCartDD": false
        };
    }
    render() {
        return (
            this.renderNavBar()
        );
    }
    renderNavBar = () => {
        return (
            <nav className="nav-wrapper">
                <div className="container">
                    <div className="width25left">
                        <Link to="/" className="brand-logo">
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>
                    <div className="width25right">

                        <ul className="right">

                            <li>
                                <a className="dropdown-button" href="#!"
                                    onMouseOver={this.myCartMouseOver}
                                    onClick={this.expandCartDD} onBlur={this.collapseCartDD}>
                                    My cart ({this.props.addedItems.length})
                                    <i className="material-icons right">arrow_drop_down</i>
                                </a>
                                {this.getCartPopUpDOM()}
                            </li>
                        </ul>
                    </div>
                    <div className="width50">
                        <ul>
                            {this.getNavBarLinks()}

                        </ul>
                    </div>

                </div>
            </nav>
        )
    }
    getCartPopUpDOM = () => {
        return this.props.addedItems.length > 0 ? this.cartPopUpWithItems() : this.noItemCartPopUp();
    }
    noItemCartPopUp = () => {
        return (<div className={this.getCartDDCss()} onFocus={this.keepExpandCartDD} onBlur={this.collapseCartDD} tabIndex="0">
            No item in your card!
     </div>);
    }
    cartPopUpWithItems = () => {
        return (<div className={this.getCartDDCss()} onFocus={this.keepExpandCartDD} onBlur={this.collapseCartDD} tabIndex="0">

            <CartPopUp></CartPopUp>

        </div>);
    }
    cartPopupPreviousStage = false;
    myCartMouseOver = () => {
        this.cartPopupPreviousStage = this.isCartDDVisible;
    }

    isCartDDVisible = false;
    keepExpandCartDD = () => {
        this.isCartDDVisible = true;
        this.setState({
            "showHideCartDD": this.isCartDDVisible
        });
    }
    expandCartDD = () => {
        this.isCartDDVisible = !this.cartPopupPreviousStage;
        this.cartPopupPreviousStage = this.isCartDDVisible;
        this.setState({
            "showHideCartDD": this.isCartDDVisible
        });
    }
    collapseCartDD = () => {
        this.isCartDDVisible = false;
        this.setState({
            "showHideCartDD": this.isCartDDVisible
        });
    }
    getCartDDCss = () => {
        const css = this.props.addedItems.length > 0 ? 'bigcCartDD' : 'bigcCartDD noItemCartPopUpCSS'
        return this.isCartDDVisible ? css + ' showCartDD' : css;
    }
    getNavBarLinks = () => {
        return BigCUtils.navLinks.map(element => {
            if (element.subMenu) {
                return (<li key={element.title}><a className="dropdown-button" href="#!" data-activates="dropdown1">{element.title}<i className="material-icons right">arrow_drop_down</i></a></li>);
            } else {
                return (<li key={element.title}><Link to={element.path}>{element.title}</Link></li>);
            }

        });
    }
}




const mapStateToProps = (state) => {
    return {
        addedItems: state.addedItems
    }
}

export default connect(mapStateToProps)(BigCNavBar)