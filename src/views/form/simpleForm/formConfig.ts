import {FormOption} from "@/components/SpursForm/formType.ts";
export const formConfig: FormOption = {
    formItems: [
        {
            field: 'id',
            type: 'input',
            label: '用户id',
            placeholder: '请输入用户id',
            colSpan:9,
            prop:"id"
        },
        {
            field: 'account',
            type: 'input',
            label: '用户名',
            disabled:true,
            placeholder: '请输入用户名'
        },
        {
            field: 'realname',
            type: 'input',
            label: '真实姓名',
            placeholder: '请输入真实姓名'
        },
        {
            field: 'cellphone',
            type: 'input',
            label: '电话号码',
            placeholder: '请输入电话号码'
        },
        {
            field: 'enable',
            type: 'select',
            label: '用户状态',
            placeholder: '请选择用户状态',
            options: [
                { label: '启用', value: 1 },
                { label: '禁用', value: 0 }
            ]
        },
        {
            field: 'createAt',
            type: 'datepicker',
            label: '创建时间',
            otherOptions: {
                startPlaceholder: '开始时间',
                endPlaceholder: '结束时间',
                type: 'daterange'
            }
        },
        {
            field: 'special',
            slotName:'special',
            label: '自定义内容',
            colSpan:12
        },
        {
            field: 'special2',
            slotName:'special2',
            label: '自定义内容2',
            colSpan:12
        },
    ],
    labelWidth: '120px'//标签的长度
}
