# Text

```js
import { Text } from 'slate'
```

## 属性

```js
Text({
    characters: Immutable.List<Character>,
    key: String
})
```

**characters**

与`Marks`关联的`Characters`的列表

**key**

标识符

**object**

`'text'`

## 计算属性

**text**

纯文本的串联

## 静态方法

**Text.create**

```js
Text.create(properties: Object) => Text
```
**Text.fromJSON**
**Text.isText**

## 实例方法

**toJSON**