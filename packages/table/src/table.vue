<template>
  <div :class="$options.name">
    <el-table
      ref="table"
      size="small"
      header-cell-class-name="com-table-header-cell"
      cell-class-name="com-table-cell"
      tooltip-effect="light"
      :data="tableData"
      v-on="$listeners"
      v-bind="tableOtherParams">
      <!-- checkbox -->
      <el-table-column
        v-if="isShowCheckbox"
        align="center"
        type="selection"
        width="55"/>
      <!-- 普通列 -->
      <el-table-column
        v-for="(line,index) in lines"
        :key="index"
        v-bind="line">
        <template slot-scope="scope">
          <!-- 插槽，用于自定义内容 -->
          <slot
            :name="'column_' + scope.column.property"
            :code="scope.column.property"
            :row="scope.row">
            {{ scope.row[scope.column.property] == null ? '' : scope.row[scope.column.property] }}
          </slot>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column
        v-if="isShowAction"
        class-name="table-action"
        :width="actionLineWidth"
        label="操作">
        <div
          slot-scope="scope"
          v-if="tableAction.length > 0">
          <el-button
            class="com-table-action"
            type="text"
            size="mini"
            v-for="(action, index) in tableAction"
            :key="index"
            :style="{color: action.color}"
            @click="tableActionClick(action, scope.row)">
            {{ action.name }}
          </el-button>
        </div>
        <div slot-scope="scope" v-else>
          <slot
            name="table_action"
            :code="scope.column.property"
            :row="scope.row">11</slot>
        </div>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="isShowPagination"
      class="com-table-pagination"
      :current-page="currentPage"
      :total="totalCount"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :layout="pageLayout"
      v-bind="pageOtherParams"
      v-on="$listeners" />
  </div>
</template>

<script>
export default {
  name: 'AiTable',
  props: {
    tableData: {
      type: Array,
      default: () => ([]),
      required: true
    },
    tableLines: {
      type: Array,
      default: () => ([]),
      required: true
    },
    isShowCheckbox: {
      type: Boolean,
      default: true
    },
    tableOtherParams: {
      type: Object,
      default: () => ({})
    },
    isShowAction: {
      type: Boolean,
      default: false
    },
    actionLineWidth: {
      type: [String, Number],
      default: '100'
    },
    tableAction: {
      type: Array,
      default: () => ([])
    },
    isShowPagination: {
      type: Boolean,
      default: true
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSizes: {
      type: Array,
      default: () => ([10, 20, 50])
    },
    pageSize: {
      type: Number,
      default: 10
    },
    totalCount: {
      type: Number,
      default: 0
    },
    pageLayout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    pageOtherParams: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    lines() {
      return this.tableLines.filter(item => item.showLine !== false)
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    tableActionClick(action, row) {
      this.$emit('table-action-click', {
        action,
        row
      })
    }
  }
}
</script>
