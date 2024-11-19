<template>
  <div class="header">
    <slot name="header"> </slot>
  </div>
  <el-form
      ref="ruleFormRef"
      :label-width="labelWidth"
      status-icon
      :model="modelValue"
      v-bind="$attrs"
  >
    <el-row>
      <template v-for="item in formItems" :key="item.label">
        <el-col :span="item.colSpan??24">
          <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :prop="item.field"
          >
            <template v-if="item.type === 'input' || item.type === 'password'">
              <el-input
                  :disabled="item.disabled??false"
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-model="modelValue[`${item.field}`]"
                  clearable
              />
            </template>
            <template v-else-if="item.type === 'select'">
              <el-select
                  :placeholder="item.placeholder"
                  v-model="modelValue[`${item.field}`]"
                  style="width: 100%"
                  clearable
              >
                <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    :label="option.label"
                >
                </el-option>
              </el-select>
            </template>
            <template v-else-if="item.type === 'datepicker'">
              <el-date-picker
                  unlink-panels
                  value-format="YYYY-MM-DD"
                  v-bind="item.otherOptions"
                  v-model="modelValue[`${item.field}`]"
              ></el-date-picker>
            </template>
            <template v-if="item.slotName!=undefined">
              <slot :name="item.slotName"></slot>
            </template>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
    <el-form-item>
      <slot name="footer"></slot>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import {FormItem} from "@/components/SpursForm/formType.ts";
import { ref } from 'vue'
import type { FormInstance } from 'element-plus'

// 定义属性
interface Props {
  formItems: FormItem[] // 表单配置项
  labelWidth?: string // 每个表单标题宽度
  modelValue: object //绑定表单的每个数据
}
const props = withDefaults(defineProps<Props>(), {
  formItems: () => [],
})
const ruleFormRef = ref<FormInstance>()
defineExpose({
  ruleFormRef
})
</script>

<style scoped lang="scss">
</style>

