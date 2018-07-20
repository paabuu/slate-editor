# Operation

operation是对Slate部分value的改变的最底层描述。被用来进行协作编辑。

所有的`Change`作用在创建和应用在`Value`的操作的方法都能通过`change.operations`属性获取。

Slate有较少操作类型。目的是使用最少的类型来维持必须的语义以支持合作编辑。

## 文本操作

**insert_text**

```js
{
    type: 'insert_text',
    path: Array,
    offset: Number,
    text: String,
    marks: Array
}
```
在`path`中的text节点中偏移`offset`处插入`text`字符串，可以带`marks`

**remove_text**

```js
{
    type: 'remove_text',
    path: Array,
    offset: Number,
    text: String
}
```

移除text节点offset处的文字。

## 标记操作

**add_mark**

```js
{
    type: 'add_mark',
    path: Array,
    offset: Number,
    length: Number,
    mark: Object
}
```

给一段文字添加mark。

**remove_mark**

```js
{
    type: 'remove_mark',
    path: Array,
    offset: Number,
    length: Number,
    mark: Object
}
```
移除一段文字上的mark。

**set_mark**

```js
{
    type: 'set_mark',
    path: Array,
    offset: Number,
    length: Number.
    mark: Object
}
```

对已存的mark设置新的属性。

## 节点操作

**insert_node**

```js
{
    type: 'insert_node',
    path: Array,
    node: Object
}
```

在`path`处插入节点。

**merge_node**
```js
{
    type: 'merge_node',
    path: Array,
    position: Number,
    properties: Object
}
```

将`path`的节点与它前一个相邻的节点合并。

**move_node**

```js
{
    type: 'remove_node',
    path: Array,
    node: Object
}
```

移除一个节点。

**set_node**

```js
{
    type: 'set_node',
    path: Array,
    properties: Object,
    node: Object
}
```

设置节点的新属性。

**split_node**

```js
{
    type: 'split_node',
    path: Array,
    position: Number,
    target: Number,
    properties: Object
}
```

## 值操作

**set_selection**
```js
{
    type: 'set_selection',
    properties: Object,
    selection: Object
}
```
设置selection的属性

**set_value**

```js
{
    type: 'set_value',
    properties: Object,
    value: Object
}
```

设置value的新属性

## Helpers

**apply**

```js
    apply(value: Value, operation: Obhect) => Value
```

把operation应用在value对象上。

**invert**

```js
invert(operation: Object) => Object
```

逆操作。