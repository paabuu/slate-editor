# Character

```js
import { Character } from 'slate'
```

字符是一个`Text`节点。
字符表示Slate如何将`Marks`和文字联系起来，进行格式化。

## Properties

```js
Character({
    marks: Immutable.Set<Mark>,
    text: string
})
```

**object**

值为`'character'`

**marks**

附加到文字上的样式的集合

**text**

文字内容


## 静态方法

**Character.create**

```js
Character.create(properties: Object) => Character
```

通过javascript 对象创建character

**Character.createList**

```js
Character.createList(array: Array) => List
```

创建character列表

**Character.fromJSON**

```js
Character.fromJSON(object: Object) => Character
```

通过JSON创建character

**Character.isCharacter**

```js
Character.isCharacter(maybeCharacter: any) => Boolean
```

判断是不是character

## 实例方法

**toJSON**

```js
toJSON() => Object
```

返回character的JSON形式
