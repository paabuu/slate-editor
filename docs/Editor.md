# Editor

```js
import { Editor } from 'slate-react'
```

## Props

```js
<Editor
    autoCorrect={Boolean}
    autoFocus={Boolean}
    className={String}
    onChange={Function}
    placeholder={String || Element}
    plugins={Array}
    readonly={Boolean}
    role={String}
    spellCheck={Boolean}
    value={Value}
    style={object}
    tabIndex={Number}
/>
```

**autoCorrect**

是否自动纠正拼写错误

**autoFocus**

是否自动获得焦点

**className**

类名

**onChange**

```js
Function onChange(change: Change)
```

**placeholder**

```js
String || Element
```

**plugins**

插件列表。

**readOnly**

只读

**role**

编辑器的角色？？

**spellCheck**

拼写检查

**style**

**tabIndex**

**value**

当前编辑器的值

