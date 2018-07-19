# Inline

```js
import { Inline } from 'slate'
```

Slate `Document`中的行内节点。Inline节点继承`Node`接口。

行内节点可能会包含行内节点和文字节点-就像DOM一样。它们总是包含至少一个text节点。

## 属性

```js
Inline({
    data: Data,
    isVoid: Boolean,
    key: string,
    nodes: Immutable.List<Node>,
    type: String
})
```

**data**

任意和节点相关的data。默认值是空的`Map`.

**isVoid**

是不是空节点。就算是空节点，Inline节点也还会有一个空的Text节点。

**key**

node的唯一标识符

**nodes**

子节点的列表。

**type**

自定义类型。如(`link`或`hashtag`)

## 计算属性

**text**

节点下所有文字的串联。

## 静态方法

**Inline.create**

```js
Inline.create(properties: Object) => Inline
```

创建新的Inline节点

**Inline.createList**

```js
Inline.createList(array: Array) => List
```

创建行内节点列表。

**Inline.fromJSON**

```js
Inline.fromJSON(obejct: Object) => Inline
```

通过JSON对象创建Inline节点。

**Inline.isInline**

```js
Inline.isInline(maybeInlien: Any) => Boolean
```
判断传入对象是不是`Inline`节点。

## Node方法

继承`Node`的方法。

## 实例方法

**toJSON**

```js
toJSON() => Object
```

返回行内节点的JSON形式。
