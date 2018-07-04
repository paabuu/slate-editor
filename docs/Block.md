# Block

```js
import { Block } from 'slate'
```

Slate `Document` 中的块级节点。Block节点实现`Node`接口.

Block节点可能包含内嵌块级节点, 行内节点，文本节点-就像DOM一样。他们至少包含一个文本子节点。

## 属性

```
Block({
    data: data,
    isVoid: Boolean,
    key: string,
    nodes: Immutable.List<Node>,
    type: string
})
```
**data: Immutable.Map**

和节点相关的任意数据。默认值是空`Map`。

**isVoid**

节点是是不是'void'节点的意思是它有没有子内容（如图片，视频等）。默认是`false`。

**key**

节点唯一的识别符

**object**

一个为了简单区分节点是Inline还是Text的不可变字符值。

**nodes: Immutable.List**

子节点列表。默认值是只有一个文本节点的数组。

**type**

自定义的节点类型。如`blockquote`或`list-item`。


## 计算属性

**text: <string>**

该节点所有后代`Text`节点的串联。

## 静态方法

**Block.create**

```js
Block.create(properties: Object) => Block
```
根据传入的属性值创建新的block

**Block.createList**

```js
Block.createList(array) => List
```
创建block节点的列表

**Block.fromJSON**

```js
Block.fromJSON(object: Object) => Block
```
根据传入的JSON创建block

**Block.isBlock**

```js
Block.isBlock(maybeBlock: Any) => Boolean
```
判断传入的参数是不是一个`Block`

## 实例方法

**toJSON**

返回block的json形式