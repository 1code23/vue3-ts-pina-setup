//表格行el-table-column配置项
export interface ColumnOption {
    prop?: string
    label: string
    minWidth?: string
    slotName?: string
    align?: string
    filter?: Function | undefined
}
//表格配置项
export interface TableOption {
    propList: ColumnOption[]
    showIndexColumn?: boolean
    showSelectColumn?: boolean
    showPagination?: boolean
    childrenProps?: object
}
