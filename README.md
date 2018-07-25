# slate-editor
a rich text editor based on slate.js


## 核心概念

[1. Block](./docs/Block.md)

[2. Change](./docs/Change.md)

[3. Character](./docs/Character.md)

[4. Document](./docs/Document.md)

[5. Inline](./docs/Inline.md)

[6. Mark](./docs/Mark.md)

[7. Node](./docs/Node.md)

[8. Operation](./docs/Operation.md)

[9. Range](./docs/Range.md)

[10. Schema](./docs/Schema.md)

[11. Text](./docs/Text.md)

[12. Value]('./docs/Value.md)

## Slate React

[1. Editor](./docs/Editor.md)

## 用法

## Mark

### renderMark

根据不同的mark类型显示不同组件

```js
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
```

### toggleMark

切换mark效果

```js
    const type = "{mark type}";
    const { value } = this.state;
    const change = value.change().toggleMark(type);

    this.onChange(change);
```

### has mark

当前selection是否有某mark

```js
    hasMark = type => {
      const { value } = this.state;
      return value.activeMarks.some(mark => mark.type == type);
    }
```

## Node

### renderNode
```js
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
        const caption = node.data.get('caption');
        const { value } = this.state;
        const change = value.change();

        return (
            <Image 
                src={src} 
                caption={caption}
                update={data => this.updateImage(node.key, data)}
                isSelected={isSelected} 
                {...attributes} 
            />
        )
    case 'paragraph':
        return <div {...attributes}>{children}</div>
    }
}
```

### hasBlock

```js
hasBlock = type => {
    const { value } = this.state;
    return value.blocks.some(node => node.type == type)
}
```

### toggleBlock

```js
    const { value } = this.state;
    const change = value.change();
    const type = /*node 的类型*/;
    change.setBlocks(hasBlock(type) ? "paragraph" : type)
```

### insertBlock

```js
  change.insertBlock({
    type: 'image',
    isVoid: true,
    data: { src, caption: '' }
  })
```

## inline

### hasInline

```js
    hasInline = () => {
      const { value } = this.state;
      return value.inlines.some(inline => inline.type === 'link');
    }
```

### wrapInline/unwrapInline

```js
change.wrapInline({
    type: 'link',
    data: { href: 'xx' }
});
```

## schema

```js
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
```

## plugins

插件可以重写Ediotr的props;

```js
const heading = (level) => {
  return {
    renderNode(props) {
      const { attributes, children, node, isSelected } = props;
      const type = `h${level}`;
      if (node.type === type) {
        return React.createElement(
          type,
          { ...attributes, className: `header-${level}`},
          children
        )
      }
    }
  }
};
```


## html-serializer

```js
import Html from 'slate-html-serializer';

const rules = [
  {
    serialize(obj, children) {
      if (obj.object == 'block') {
        switch(obj.type) {
          case 'paragraph': 
            return <p>{children}</p>;
          case 'heading-one':
            return <h1>{children}</h1>;
          case 'image':
            const src = obj.data.get('src');
            const caption = obj.data.get('caption');
            return (
              <figure>
                <img src={src} alt=""/>
                <figcaption>{caption}</figcaption>
              </figure>
            );
          default:
            return <div>{children}</div>
        }
      }
    }
  }
];

const html = new Html({ rules });
const result = html.serialize(value);
```

## 注意事项

- toolbar的点击事件要用`onMouseDown`, 并阻止默认事件，这样点击才不会取消选中
