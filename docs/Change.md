# Change

```js
import { Change } from 'slate'
```
change允许你定义一系列的对现在`Value`的改变。

所有的改变都通过`Change`对象，所以变化的历史可以保留下来用于undo/redo操作，还能使协作编辑称为可能。 

## 属性

**object: string**

`'change'`值的字符串

**value**

change的当前操作应用后的`Value`。每次执行一个新的变化函数，这个属性就会发生改变。

## 方法

**call**

```js
call(customChange: Function, ...args) => Change
```

这个方法调用提供的`customChange`函数，并把`Change`实例作为第一个参数，并传递剩下的参数。

**normalize**

```js
normalize() => Void
```
格式化

## Full Value Change

**setValue**

```js
setValue(properties: Object, [options: Object]) => Change
setValue(value: Value, [options: Object]) => Change
```

## Current Value Changes

这些变化会根据当前的`selection`作用于`document`上。这和把当前的selection作为`range`参数来调用Document Change是一样的，但是会更方便，在你经常想操作当前的selection的时候。

**deleteBackward**

```js
deleteBackward(n: number) => Change
```
从当前位置向后删除n个字符。如果selection有内容，就等于`delete()`。`n`的默认值是`1`。

**deleteForward**

```js
deleteForward(n: number) => Change
```
向前删除

**delete**

```js
delete() => Change
```
删除选中区所有内容

**insetBlock**

```js
insertBlock(block: Block) => Change
insertBlock(properties: Object) => Change
insertBlock(type: String) => Change
```
插入一个跟当前block同级的新block，如果有选中的block，会删除掉

**insertFragment**

```js
insertFragment(fragment: Document) => Change
```
插入`fragment`

**insertInline**

```js
insertInline(inline: Inline) => Change
insertInline(properties: Object) => Change
```
插入inline

**insertText**

```js
insertText(text: String) => Change
```
插入一段文字

**addMark**

```js
addMark(mark: Mark) => Change
addMark(properties: Object) => Change
addMark(type: String) => Change
```
给选中区的字符添加`mark`。为了方便，你可以传递`type`字符串或者`properties`对象隐式创建`Mark`类型

**setBlocks**
```js
setBlocks(properties: Object) => Change
setBlocks(properties: String) => Change
```
设置当前选中区的`Blocks`的`properties`

**setInlines**

```js
setInlines(properties: Object) => Change
setInlines(type: String) => Change
``` 

设置当前选中区的`Inline`节点的`properties`。

**splitBlock**

```js
splitBlock(depth: Number) => Change
```

根据`depth`级别分割`Block`

**splitInline**

```js
splitInline(depth: Number) => Change
```
根据`depth`级别分割`Inline`节点

**removeMark**

```js
removeMark(mark: Mark) => Change
removeMark(properties: Object) => Change
removeMark(type: String) => Change
```
移除`mark`

**replaceMark**

```js
replaceMark(oldMark: Mark, newMark: Mark)
replaceMark(oldProperties: Object, newProperties: Object)
replaceMark(oldType: String, newType: String)
```

**toggleMark**

切换mark

**unwrapBlock**

```js
unwrapBlock(type: String) => Change
unwrapBlock(properties: Object) => Change
```
打开所有匹配的`Block`节点

**unwrapInline**

打开所有的Inline

**wrapBlock**
**wrapInline**
**wrapText**