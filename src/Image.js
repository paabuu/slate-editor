import React, { Component } from 'react';
import classNames from 'classnames';

export default class Image extends Component {

    handleCaptionChange = e => {
        e.preventDefault();
        this.props.update({
            src: this.props.src,
            caption: e.target.value
        });
    }

    handleFocus = e => {
        e.stopPropagation();
        this.input.focus();
    }

    render() {
        const { src, caption, isSelected } = this.props;
        const className = classNames(
            'image-node',
            { 'image-focused': isSelected }
        );

        return (
            <div className="editor-image">
                <img src={src} className={className} />
                <input 
                    ref={el => this.input = el}
                    value={caption}
                    type="text"
                    onChange={this.handleCaptionChange}
                    onMouseDown={this.handleFocus}
                    onClick={this.handleFocus}
                    className="caption-input"
                    placeholder="在此输入图片标题"
                />
            </div>
        )
    }
}