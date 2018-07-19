# Document 

```js
import { Document } from 'slate'
```

Slate文档模型的最顶层节点。

Documents由block节点，inline节点和text节点组成，跟DOM一样。注意document的直接子节点必须是block节点。

在一些地方，你会看到提到"fragments", 它也是`Document`对象， 只是它不与主`Value`联系。例如，当复制粘贴文档的选中区时，这个内容会被认为是document片段。

## 属性

```js
Document({
    nodes: Immutable.List<Node>,
})
```

**data**

任意的和document关联的data。默认是是空`Map`.

**object**

`'document'`

**nodes**

子节点的列表。

## 计算属性

**text**

几点下所有文字的串联

## 静态方法

**Document.create**

```js
Document.create(properties: Object) => Document
```

**Document.create**

创建一个document

**Document.fromJSON**

```js
Document.fromJSON(object: Object) => Document
```

通过JSON对象创建document

**Document.isDocument**

```js
Document.isDocument(maybeDocument: Any) => Boolean
```

## Node 方法

Document继承`Node`接口。

## 实例方法

**toJSON**

```js
toJSON() => Object
```

返回document的JSON形式