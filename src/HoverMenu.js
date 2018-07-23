import React, { Component } from 'react';
import classnames from 'classnames';
import ReactDOM from 'react-dom';

import './HoverMenu.css';

const menuItems = [
    {
        name: 'B',
        type: 'bold'
    },
    {
        name: 'I',
        type: 'italic'
    },
    {
        name: 'U',
        type: 'underline'
    }
];

export default class HoverMenu extends Component {
    render() {
        return ReactDOM.createPortal(
            <div className="hover-menu" ref={this.props.innerRef}>
                {
                    menuItems.map(item => (
                        this.renderMarkButton(item.name, item.type)
                    ))
                }
            </div>,
            document.getElementById('root')
        )
    }

    onClickMark = (e, type) => {
        e.preventDefault();
        
        const { value, onChange } = this.props;
        const change = value.change().toggleMark(type);

        onChange(change);
    }

    renderMarkButton = (name, type) => {
        const { value } = this.props;
        const isActive = value.activeMarks.some(mark => mark.type == type);
        const classNames = classnames('hover-menu-item', {
            "hover-menu-item-active": isActive
        });

        return (
            <span
                className={classNames}
                onMouseDown={e => this.onClickMark(e, type)}
                key={type}
            >{name}</span>
        )
    }
}