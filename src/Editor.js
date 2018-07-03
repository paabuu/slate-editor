import React, { Component } from 'react';

import { Editor } from 'slate-react';
import { Value } from 'slate';

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

const plugins = [
  markHotKey({ key: 'b', type: 'bold' }),
  markHotKey({ key: 'i', type: 'italic' }),
  markHotKey({ key: 'u', type: 'underline' }),
  markHotKey({ key: 's', type: 'strikethrough' }),
  markHotKey({ key: '`', type: 'code' })
]

export default class MyEditor extends Component {
    state = {
        value: initialValue
    }

    onChange = ({ value }) => {
        this.setState({ value });
    }

    onKeyDown = (event, change) => {

      if (!event.ctrlKey) return;

      event.preventDefault();

      switch (event.key) {
        case '`':
          const isCode = change.value.blocks.some(block => block.type === 'code');

          change.setBlocks(isCode ? 'paragraph' : 'code');
          return true;
      }
    }

    renderNode = (props) => {
      switch (props.node.type) {
        case 'code':
          return <CodeNode {...props} />
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
          return <code>{props.children}</code>
        case 'strikethrough':
          return <del>{props.children}</del>
      }
    }

    render() {
        return (
            <Editor
                plugins={ plugins }
                value={ this.state.value }
                onChange={ this.onChange }
                onKeyDown={ this.onKeyDown }
                renderNode={ this.renderNode }
                renderMark={ this.renderMark }
            />
        )
    }
}
