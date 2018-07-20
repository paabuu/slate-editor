# Range

```js
import { Range } from 'slate'
```

Slate `Document`的范围。Ranges结合了DOM Selection API和DOM Range API,使用了`"anchor"`, `"focus"`, `collapsed`等术语。

"anchor"是range中固定的一个点，"focus"是一个不固定的点，在你一定光标的时候可能会变化。

大多数情况下，你不需要知道那个是锚点，哪个是焦点。只需要知道哪个是开始，哪个是结束就可以。

## 属性

```js
Range({
    anchorKey: String,
    anchorOffset: Number,
    focusKey: String,
    focusOffset: Number,
    isFocused: Boolean,
    isBackward: Boolean
})
```

**anchorKey**

锚点位置的文本节点的key

**anchorOffset**

锚点所在的文本节点起始点到锚点的偏移

**focusKey**

焦点位置的文本节点的key

**focusOffset**

焦点所在的文本节点起始点到焦点的偏移

**isBackward**

backward指的是焦点在锚点之前。

**isFocused**

当前是否有焦点。

**object**

`"string"`

## 计算属性

**isBlurred**

失去焦点。

**isCollapsed**

焦点与锚点在同一位置。

**isExpanded**

展开，与`isCollapsed`相反

**isForward**

与`isBackward`相反

**startKey**
**startOffset**
**endKey**
**endOffset**


## 静态方法

**Range.create**

```js
Range.create(properties: Object) => Range
```

创建新的Range

**Range.fromJSON**

```js
Range.fromJSON(object: Object) => Range
```
通过JSON创建Range

**Range.isRange**

```js
Range.isRange(maybeRange: Any) => Boolean
```

## 实例方法

```js
toJSON() => Object
```

返回Range的JSON形式

## 检查方法

**has{Edge}AtStartOf**

```js
has{Edge}AtStartOf(node: Node) => Boolean
```

`Edge`可以是： `Anchor`, `Focus`, `Start`, `End`, `Edge`

判断node开始是否有`Edge`

**has{Edge}AtEndOf**
```js
has{Edge}AtEndOf(node: Node) => Boolean
```

**has{Edge}Between**
**has{Edge}In**
**isAtStartOf**
**isAtEndOf**
