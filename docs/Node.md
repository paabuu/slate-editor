# Node

`Node`不是一个公开的可获得的模块，而是一个`Document`, `Block`, `Inline`都可以继承的接口。

## 属性

**key**

一个短期的唯一的标识符

**nodes**

子节点列表。默认值是只有一个text节点的数组。

**object**

`'document'`, `'block'`, `'inline'`, `'text'`

## 计算属性

**text**

Text节点所有文字的串联

## 方法

**filterDescendants**

```js
filterDescendants(iterator: Function) => List
```

深度迭代所有的后代节点

**findDescendant**

```js
findDescendant(iterator: Function) => Node || Void
```

**getBlockAtRange**

```js
getBlocksAtRange(range: Range) => List
```

**getBlocks**

```js
getBlocks() => List
```

**getCharactersAtRange**

```js
getCharacterAtRange(range: Range) => List
```

**getChild**

```js
getChild(key: string || Node) => Node || Void
```

**getClosestBlock**
```js
getClosestBlock(key: String|| Node) => Node || Void
```

**getClosestInline**
```js
getClosestInline(key: String|| Node) => Node || Void
```

**getClosestInline**





