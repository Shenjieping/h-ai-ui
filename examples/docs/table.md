# table 组件
----

## 基础用法

全部通过配置项传入

:::demo
```html
<template>
  <ai-table
    :table-data="tableData"
    :table-lines="tableLines"
    :is-show-checkbox="isShowCheckbox"
    :show-overflow-tooltip="showOverflowTooltip"
    :is-show-action="isShowAction"
    :table-action="tableAction"
    :current-page="currentPage"
    :total-count="totalCount"
    :page-size="pageSize"
    @selection-change="selectionChange"
    @table-action-click="tableActionClick"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange" />
</template>
<script>
  export default {
    data() {
      return {
        tableData: [
          {name: '名称1', type: '类型1', date: '时间1'},
          {name: '名称2', type: '类型2', date: '时间2'},
          {name: '名称3', type: '类型3', date: '时间3'}
        ],
        tableLines: [
          {label: '名称', prop: 'name', sortable: true},
          {label: '类型', prop: 'type', width: '200px', showLine: false},
          {label: '时间', prop: 'date', width: '300px'}
        ],
        isShowCheckbox: true,
        showOverflowTooltip: true,
        isShowAction: true,
        tableAction: [
          {name: '编辑', code: 'edit', color: '#273cc0'},
          {name: '删除', code: 'edit', color: '#f66'}
        ],
        currentPage: 1,
        totalCount: 100,
        pageSize: 10
      }
    },
    methods: {
      selectionChange(rows) {
        console.log('rows', rows)
      },
      tableActionClick({ action, row }) {
        console.log('table-action-click', action, row)
      },
      handleCurrentChange(val) {
        this.currentPage = val
      },
      handleSizeChange(val) {
        this.currentPage = 1
        this.pageSize = val
      }
    }
  }
</script>
```
:::

## 通过sloat方式自定义样式

:::demo
```html
<template>
  <ai-table
    :table-data="tableData"
    :table-lines="tableLines"
    :is-show-checkbox="isShowCheckbox"
    :show-overflow-tooltip="showOverflowTooltip"
    @selection-change="selectionChange"
    :is-show-action="isShowAction">
    <template
      slot="column_date"
      slot-scope="{row}">
      date: {{ row.date }}
    </template>
    <template
      slot="table_action"
      slot-scope="{row}">
      <el-button
        type="text"
        @click="tableActionClick(row)"
        size="mini">
        编辑
      </el-button>
    </template>
  </ai-table>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [
          {name: '名称1', type: '类型1', date: '时间1'},
          {name: '名称2', type: '类型2', date: '时间2'},
          {name: '名称3', type: '类型3', date: '时间3'}
        ],
        tableLines: [
          {label: '名称', prop: 'name', width: '100px'},
          {label: '类型', prop: 'type'},
          {label: '时间', prop: 'date', width: '300px'}
        ],
        isShowCheckbox: true,
        showOverflowTooltip: true,
        isShowAction: true
      }
    },
    methods: {
      selectionChange(rows) {
        console.log('rows', rows)
      },
      tableActionClick(row) {
        console.log('table-action-click', row)
      }
    }
  }
</script>
```
:::

:::tip

该组件基于element-ui 的 `table` 组件和 `pagination`组件封装，支持这两个组件原有的熟悉

下面只列举了组件封装的属性和方法，更多属性请查看elment-ui 文档：[table](https://element.eleme.cn/2.15/#/zh-CN/component/table) 、[pagination](https://element.eleme.cn/2.15/#/zh-CN/component/pagination)

:::

## Table Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| tableData |  表格显示的数据（必填）  |  Array  |     --     |   --   |
| tableLines | 表格行配置（必填） | Array | [{lable: '', prop: '', width: '', showLine: true, 以及element-ui所有的Table-column Attributes}] | -- |
| isShowCheckbox | 是否显示勾选框 | Boolean | -- | true |
| tableOtherParams | elemnet-ui table Attribute其他的配置项 | Object | -- | -- |
| isShowAction | 是否显示操作列 | Boolean | -- | true |
| actionLineWidth | 操作列宽 | Number/String | -- | 100 |
| tableAction | 操作配置项，如果不传或传[]，则采用slot形式插入 | Array | [{name: '编辑', code: 'edit', color: '#f66'}] | -- |
| isShowPagination | 是否显示分页 | Boolean | -- | true |
| currentPage | 当前页 | Number | -- | 1 |
| pageSizes | 每页显示个数选择器的选项设置 | Array | -- | [10, 20, 50] |
| pageSize | 每页显示条目个数 | Number | -- | 10 |
| totalCount | 总条目数 | Number | -- | 0 |
| pageLayout | 组件布局，子组件名用逗号分隔 | String | `sizes`, `prev`, `pager`, `next`, `jumper`, `->`, `total`, `slot` | total, sizes, prev, pager, next, jumper |
| pageOtherParams | element-ui Pagination 除上面以外的配置项 | Object | -- | -- |

## Events

| 事件名称           | 说明                             | 回调参数                         |
| ------------------ | -------------------------------- | -------------------------------- |
| table-action-click | 操作按钮点击事件                 | { action, row }                  |
| table events       | element-ui table 所有的事件      | element-ui table event 参数      |
| pagination events  | element-ui pagination 所有的事件 | element-ui pagination event 参数 |



## Slot

| name         | 说明                                            |
| ------------ | ----------------------------------------------- |
| column_xx    | 表格列自定义内容，xx 代表tableLines传入的prop   |
| table-action | 操作自定义内容，如果tableAction不传或者传[]生效 |

