# Schema

每个Slate编辑器都有一个模板，包含了内容的结构信息。对于最基本的情况，只需要使用Slate默认的核心模板。但是对于更高级的场景，你可以自定义document可以包含什么内容。

## 属性

```js
{
    document: Object,
    blocks: Object,
    inlines: Object
}
```

**document**

```js
{
    dcoument: {
        nodes: [{ types: ['paragraph'] }]
    }
}
```

**blocks**

```js
{
    blocks: {
        list: {
            nodes: [{ types: ['item'] }]
        },
        item: {
            parent: { types: ['list'] }
        }
    }
}
```

**inlines**

```js
{
    inlines: {
        emoji: {
            isVoid: true,
            nodes: [{ objects: ['text'] }]
        }
    }
}
```

## 规则属性

```js
{
    data: Object,
    first: Object,
    isVoid: boolean,
    last: Object,
    nodes: Array,
    marks: Array,
    normalize: Function,
    parent: Object,
    text: RegExp
}
```