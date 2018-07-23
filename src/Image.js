import React, { Component } from 'react';
import classNames from 'classnames';

export default class Image extends Component {
    render() {
        const { src, isSelected } = this.props;
        const className = classNames(
            'image-node',
            { 'image-focused': isSelected }
        );

        return (
            <img src={src} className={className} />
        )
    }
}