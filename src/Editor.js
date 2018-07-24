import React, { Component } from 'react';

import { Editor, getEventRange, getEventTransfer } from 'slate-react';
import { Value, Block } from 'slate';
import { LAST_CHILD_TYPE_INVALID } from 'slate-schema-violations';
import Html from 'slate-html-serializer';

import cheerio from 'cheerio';

import Image from './Image';
import HoverMenu from './HoverMenu';

import './editor.css';

const rules = [
  {
    serialize(obj, children) {
      if (obj.object == 'block') {
        switch(obj.type) {
          case 'paragraph': 
            return <p>{children}</p>;
          case 'heading-one':
            return <h1>{children}</h1>;
          case 'heading-two':
            return <h2>{children}</h2>;
          case 'heading-three':
            return <h3>{children}</h3>;
          case 'list-item':
            return <li>{children}</li>;
          case 'numbered-list':
            return <ol>{children}</ol>;
          case 'bulleted-list':
            return <ul>{children}</ul>;
          case 'blockquote':
            return <blockquote>{children}</blockquote>;
          case 'image':
            const src = obj.data.get('src');
            return <img src={src} alt=""/>;
          default:
            return <div>{children}</div>
        }
      }
    }
  },
  {
    serialize(obj, children) {
      if (obj.object == 'mark') {
        switch (obj.type) {
          case 'bold':
            return <strong>{children}</strong>;
          case 'italic':
            return <em>{children}</em>;
          case 'underline':
            return <u>{children}</u>;
          case 'code':
            return <pre>{children}</pre>;
          case 'strikethrough':
            return <del>{children}</del>
          default:
            return children;
        }
      } 
    }
  },
  {
    serialize(obj, children) {
      if (obj.object == 'inline') {
        switch (obj.type) {
          case 'link':
            const href = obj.data.get('href');
            return <a href={href}>{children}</a>;
        }
      }
    }
  }
];

const html = new Html({rules});

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'A line of text in a paragraph.',
              },
            ],
          },
        ],
      },
    ],
  },
});

const schema = {
  document: {
    last: { types: ['paragraph'] },
    normalize: (change, reason, { node, child }) => {
      switch (reason) {
        case LAST_CHILD_TYPE_INVALID: 
          const paragraph = Block.create('paragraph');
          return change.insertNodeByKey(node.key, node.nodes.size, paragraph);
      }
    }
  }
}

const CodeNode = (props) => (
  <pre {...props.attributes}>
    <code>{props.children}</code>
  </pre>
);

const BoldMark = (props) => (
  <strong>{ props.children }</strong>
);

function markHotKey(options) {
  const { type, key } = options;

  return {
    onKeyDown(event, change) {
      if (!event.ctrlKey || event.key !== key) return;
      event.preventDefault();
      change.toggleMark(type);
      return true;
    }
  }
}
const heading = (level) => {
  return {
    renderNode(props) {
      const { attributes, children, node, isSelected } = props;
      const type = `h${level}`;
      if (node.type === type) {
        return React.createElement(
          type,
          attributes,
          children
        )
      }
    }
  }
};

const plugins = [
  markHotKey({ key: 'b', type: 'bold' }),
  markHotKey({ key: 'i', type: 'italic' }),
  markHotKey({ key: 'u', type: 'underline' }),
  markHotKey({ key: 's', type: 'strikethrough' }),
  markHotKey({ key: '`', type: 'code' }),
  heading(1),
  heading(2),
  heading(3),
];


function insertImage(change, src, target) {  
  if (target) {
    change.select(target);
  }

  change.insertBlock({
    type: 'image',
    isVoid: true,
    data: { src }
  })
}
export default class MyEditor extends Component {

    constructor() {
      super();
      this.hoverMenu = React.createRef();
    }

    state = {
        value: initialValue
    }

    onChange = ({ value }) => {
        this.setState({ value });
    }

    onKeyDown = (event, change) => {
      event.preventDefault();

      if (event.key === '&') {
        change.insertText('and');
        return true;
      }

      if (!event.ctrlKey) return;

      switch (event.key) {
        case '`':
          const isCode = change.value.blocks.some(block => block.type === 'code');

          change.setBlocks(isCode ? 'paragraph' : 'code');
          return true;
        case '&': 
          change.insertText('and');
          return true;
      }
    }

    renderNode = (props) => {
      const { attributes, children, node, isSelected } = props;

      switch (props.node.type) {
        case 'code':
          return <CodeNode {...props} />;
        case 'bulleted-list':
          return <ul {...attributes}>{children}</ul>
        case 'list-item':
          return <li {...attributes}>{children}</li>
        case 'numbered-list':
          return <ol {...attributes}>{children}</ol>
        case 'blockquote':
          return <blockquote {...attributes}>{children}</blockquote>
        case 'link':
          const {data} = node;
          const href = data.get('href');
          return (
            <a {...attributes} href={href}>{children}</a>
          )
        case 'image':
          const src = node.data.get('src');
          return (
            <Image src={src} isSelected={isSelected} {...attributes} />
          )
        case 'paragraph':
          return <div {...attributes}>{children}</div>
      }
    }

    renderMark =(props) => {
      switch (props.mark.type) {
        case 'bold':
          return <BoldMark {...props} />
        case 'italic':
          return <em>{props.children}</em>
        case 'underline':
          return <u>{props.children}</u>
        case 'code': 
          return <code style={{ padding: '3px', border: '1px solid #ccc' }}>{props.children}</code>
        case 'strikethrough':
          return <del>{props.children}</del>
      }
    }

    onClickMark = (e, type) => {
      e.preventDefault();

      const { value } = this.state;
      const change = value.change().toggleMark(type);

      this.onChange(change);
    }

    onClickBlock = (e, type) => {
      e.preventDefault();

      const { value } = this.state;
      const change = value.change();
      const { document } = value;

      if (type != 'bulleted-list' && type != 'numbered-list') {
        const hasBlock = this.hasBlock(type);
        const isList = this.hasBlock('list-item');

        if (isList) {
          change
            .setBlocks(hasBlock ? 'paragraph' : type)
            .unwrapBlock('bulleted-list')
            .unwrapBlock('numbered-list')
        } else {
          change.setBlocks(hasBlock ? 'paragraph' : type);
        }
      } else {
        const isList = this.hasBlock('list-item');
        const isType = value.blocks.some(block => {
          return !!document.getClosest(block.key, parent => parent.type == type)
        });

        if (isList && isType) {
          change
            .setBlocks('paragraph')
            .unwrapBlock('bulleted-list')
            .unwrapBlock('numbered-list')
        } else if(isList) {
          change
            .unwrapBlock(
              type == 'bulleted-list' ? 'numbered-list' : 'bulleted-list'
            )
            .wrapBlock(type)
        } else {
          change.setBlocks('list-item').wrapBlock(type);
        }
      }

      this.onChange(change);
    }

    onClickLink = e => {
      e.preventDefault();
      const { value } = this.state;
      const change = value.change();
      const hasInline = this.hasInline();

      if (hasInline) {
        change.unwrapInline('link');
      } else if(value.isExpanded) {
        const href = window.prompt('Enter the URL of the link:');
        change.wrapInline({
          type: 'link',
          data: { href },
        })
      
        change.collapseToEnd()
      } else {
        const href = window.prompt("Enter the ulr of the link: ");
        const text = window.prompt('Enter the text for the url: ');
        
        change
          .insertText(text)
          .extend(0 - text.length)
          .wrapInline({
            type: 'link',
            data: { href }
          })
          .collapseToEnd()
      }
      this.onChange(change);
    }

    onClickImage = e => {
      e.preventDefault();
      this.imageInput.click();
      return;
    }

    onChooseImage = () => {
      const files = this.imageInput.files;
      if (files.length === 0) return;

      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const { value } = this.state;
        const change = value.change();

        change.call(insertImage, reader.result);
        this.onChange(change);
      };
      reader.readAsDataURL(file);
    }

    hasInline = () => {
      const { value } = this.state;
      return value.inlines.some(inline => inline.type === 'link');
    }

    hasMark = type => {
      const { value } = this.state;
      return value.activeMarks.some(mark => mark.type == type);
    }

    hasBlock = type => {
      const { value } = this.state;
      return value.blocks.some(node => node.type == type)
    }

    isListActive = type => {
      const { value } = this.state;

      const parent = value.document.getParent(value.blocks.first().key);

      return this.hasBlock('list-item') && parent && parent.type == type;
    }

    onDropOrPaste = (event, change, editor) => {
      const target = getEventRange(event, change.value);
      if (!target && event.type == 'drop') return;

      const transfer = getEventTransfer(event);
      const { type, text, files } = transfer;

      if (type == 'files') {
        for (const file of files) {
          const reader = new FileReader();
          const [mime] = file.type.split('/');
          if (mime != 'image') continue;

          reader.addEventListener('load', () => {
            editor.change(c => {
              c.call(insertImage, reader.result, target);
            })
          });

          reader.readAsDataURL(file);
        }
      }
    }

    componentDidUpdate() {
      this.updateMenu();
    }

    updateMenu = () => {
      const { value } = this.state;
      const menu = this.hoverMenu.current;
      if (!menu) return;

      if (value.isBlurred || value.isEmpty) {
        menu.removeAttribute('style');
        return;
      }
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      menu.style.opacity = 1;
      menu.style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`;
      menu.style.left = `${rect.left + window.pageXOffset - menu.offsetWidth / 2 + rect.width / 2}px`;
    }

    toHtml = e => {
      e.preventDefault();
      // const serializer = new Html([
      //   {
      //     serialize: (node, children) => {
      //       return '';
      //     }
      //   }
      // ]);
      const { value } = this.state;
      console.log(value.toJSON());
      const $ = cheerio.load(`<div id="container">${html.serialize(value)}</div>`);
      const content = $("#container").children();
      
      content.each(function(index, ele) {
        if(ele.tagName === 'img') {
          console.log($(this).attr('src'));
        } else {
          console.log($(this).toString());
        }
      });
      // console.log(html.serialize(value));
    }

    render() {
        return (
          <div>
            <div className="toolbar">
              <span 
                className="icon" 
                onMouseDown={(e) => this.onClickMark(e, 'bold')}
                style={{ color: this.hasMark('bold') ? 'orange' : '#efefef' }}
              >Bold</span>
              <span 
                className="icon" 
                onMouseDown={e => this.onClickMark(e, 'italic')}
                style={{ color: this.hasMark('italic') ? 'orange' : '#efefef' }}
              >Italic</span>
              <span 
                className="icon" 
                onMouseDown={e => this.onClickMark(e, 'underline')}
                style={{ color: this.hasMark('underline') ? 'orange' : '#efefef' }}
              >Underline</span>
              <span 
                className="icon" 
                onMouseDown={e => this.onClickMark(e, 'code')}
                style={{ color: this.hasMark('code') ? 'orange' : '#efefef' }}
              >Code</span>
              <span 
                className="icon" 
                onMouseDown={e => this.onClickMark(e, 'strikethrough')}
                style={{ color: this.hasMark('strikethrough') ? 'orange' : '#efefef' }}
              >StrikeThrough</span>
            </div>
            <div className="toolbar">
              <span 
                className="icon" 
                onMouseDown={(e) => this.onClickBlock(e, 'h1')}
                style={{ color: this.hasBlock('h1') ? 'orange' : '#efefef' }}
              >H1</span>
              <span 
                className="icon" 
                onMouseDown={(e) => this.onClickBlock(e, 'h2')}
                style={{ color: this.hasBlock('h2') ? 'orange' : '#efefef' }}
              >H2</span>
              <span 
                className="icon" 
                onMouseDown={(e) => this.onClickBlock(e, 'h3')}
                style={{ color: this.hasBlock('h3') ? 'orange' : '#efefef' }}
              >H3</span>
              <span 
                className="icon" 
                onMouseDown={(e) => this.onClickBlock(e, 'code')}
                style={{ color: this.hasBlock('code') ? 'orange' : '#efefef' }}
              >Code</span>
              <span 
                className="icon" 
                onMouseDown={(e) => this.onClickBlock(e, 'blockquote')}
                style={{ color: this.hasBlock('blockquote') ? 'orange' : '#efefef' }}
              >BlockQuote</span>
              <span 
                className="icon" 
                onMouseDown={(e) => this.onClickBlock(e, 'bulleted-list')}
                style={{ color: this.isListActive('bulleted-list') ? 'orange' : '#efefef' }}
              >UL</span>
              <span 
                className="icon" 
                onMouseDown={(e) => this.onClickBlock(e, 'numbered-list')}
                style={{ color: this.isListActive('numbered-list') ? 'orange' : '#efefef' }}
              >OL</span>
            </div>
            <div className="toolbar">
              <span 
                className="icon" 
                onMouseDown={ this.onClickLink }
                style={{ color: this.hasInline() ? 'orange' : '#efefef' }}
              >Link</span>
              <span
                className="icon" 
                onMouseDown={ this.onClickImage }
                style={{ color: this.hasInline() ? 'orange' : '#efefef' }}
              >
                Image
              </span>
              <span
                className="icon"
                onMouseDown={ this.toHtml }
              >ToHTML</span>
              <input 
                type="file" 
                ref={ element => this.imageInput = element }
                onChange={this.onChooseImage}
              />
            </div>
            <Editor
                autoFocus
                plugins={ plugins }
                value={ this.state.value }
                onChange={ this.onChange }
                onPaste={this.onDropOrPaste}
                onDrop={this.onDropOrPaste}
                renderNode={ this.renderNode }
                renderMark={ this.renderMark }
                className="editor"
                schema={ schema }
            />
            <HoverMenu 
              value={this.state.value} 
              onChange={this.onChange}
              innerRef={this.hoverMenu}
            />
          </div>
        )
    }
}
