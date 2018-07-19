## Mark

```js
import { Mark } from 'slate'
```

`Characters`相关的格式化标志。

## 属性

```
Mark({
    data: Data,
    type: String
})
```

**data**

`Data`的集合。

**object**

`'mark'`

**type**

自定义的mark类型(例如`bold`或`italic`)。

## 静态方法

**Mark.create**

```js
Mark.create(properties: Object) => Mark
```

创建新的Mark。

**Mark.createSet**

```js
Mark.createSet(array: Array) => Set
```

通过数组创建mark的集合。

**Mark.fromJSON**

```js
Mark.fromJSON(object: Object) => Mark
```

通过JSON创建Mark。

**Mark.isMark**

判断是不是`Mark`

## 实例方法

**toJSON**

```js
toJSON() => Object
```

返回Mark的JSON形式