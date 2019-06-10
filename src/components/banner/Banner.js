import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BigCUtils from '../utils/BigCUtils';
import './Banner.css'


class Banner extends Component {
    static propTypes = {
        category: PropTypes.string.isRequired,
    };

    render() {
        return (
            <div data-test="BannerComponent">
            {this.renderCategoryBanner()}
            </div>
        );
    }
    renderCategoryBanner = () => {
        const category = this.getCategory(this.props.category);
        if (!category) {
            return (<div className="container">
                <h4 data-test="BannerComponent-UnknownCategory">Either unknown category Or too many matches!</h4>
            </div>)
        }
        const bannerImg = {
            backgroundImage: 'url(' + category.rightImage + ')'
        };
        return (
            <div key={category.id} style={bannerImg} className="bannerContainer">

                <div className="pageheader">
                    <div className="topGap">
                        <h4 className="header1">{category.title}</h4>
                        <div>{category.description}</div>
                    </div>
                </div>

            </div>
        )
    }
    getCategory = (category) => {
        const categories = BigCUtils.categoriesBanner.filter(ele => ele.id === category);
        if (!categories || categories.length > 1) {
            return false;
        }
        return categories[0];
    }
}
export default Banner;