# Value

```js
import { Value } from 'slate'
```

`Value`是slate数据的最高级别的表现，包括`Document`和`Range`。需要你传给slate的`Editor`组件来渲染内容。

document和selection所有的更改也通过value对象来表现，所以可以保持同步，也能保存到内部undo/redo的历史记录。

为了方便，除此之外，很多selection和document属性以Value队形上的代理来暴露。

## 属性

```js
Value({
    document: Document,
    selection: Range,
    history: History,
    schema: Schema,
    data: Data,
    decorations: List<Ranges> | Null
})
```