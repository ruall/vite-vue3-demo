<template>
  <div>
    <el-form
      v-bind="getBindValue"
      ref="ruleForm"
      :model="formInline"
      :label-width="labelWidth"
      @submit.prevent
    >
      <component
        :is="isCol ? ElRow : 'div'"
        :gutter="20"
        :style="{
          display: isCol ? 'flex' : 'inline-block'
        }"
      >
        <component
          :is="isCol ? ElCol : 'div'"
          v-bind="{ ...getColValue(item) }"
          v-for="(item, $index) in schema"
          :key="item.field"
          :span="(item.colProps && item.colProps.span) || 12"
          :style="{
            display: isCol ? 'block' : 'inline-block'
          }"
        >
          <template v-if="item.component === 'Divider' && !item.hidden">
            <el-divider v-bind="{ ...item.componentProps }" />
          </template>

          <el-form-item
            v-else-if="!item.hidden"
            v-bind="{ ...getFormItemValue(item) }"
            :label="item.label"
            :prop="item.field"
          >
            <template v-if="slots && slots[item.field]">
              <slot :name="item.field" :model="formInline" :item="item" :field="item.field"></slot>
            </template>

            <template v-else>
              <template v-if="item.component === 'Radio' && item.options">
                <el-radio
                  v-for="v in item.options"
                  v-bind="{ ...item.componentProps }"
                  :key="`Radio${v.value}`"
                  v-model="formInline[item.field]"
                  :label="
                    item.optionsField && item.optionsField.valueField
                      ? v[item.optionsField.valueField]
                      : v.value
                  "
                  @change="
                    () => {
                      changeVal(item)
                    }
                  "
                >
                  {{
                    item.optionsField && item.optionsField.labelField
                      ? v[item.optionsField.labelField]
                      : v.label
                  }}
                </el-radio>
              </template>

              <template v-else-if="item.component === 'RadioGroup' && item.options">
                <el-radio-group v-model="formInline[item.field]">
                  <el-radio
                    v-for="v in item.options"
                    v-bind="{ ...item.componentProps }"
                    :key="`RadioGroup${v.value}`"
                    :label="
                      item.optionsField && item.optionsField.valueField
                        ? v[item.optionsField.valueField]
                        : v.value
                    "
                    @change="
                      () => {
                        changeVal(item)
                      }
                    "
                  >
                    {{
                      item.optionsField && item.optionsField.labelField
                        ? v[item.optionsField.labelField]
                        : v.label
                    }}
                  </el-radio>
                </el-radio-group>
              </template>

              <template v-else-if="item.component === 'Checkbox' && item.options">
                <el-checkbox
                  v-for="v in item.options"
                  v-bind="{ ...item.componentProps }"
                  :key="`Checkbox${v.value}`"
                  v-model="formInline[item.field]"
                  @change="
                    () => {
                      changeVal(item)
                    }
                  "
                >
                  {{
                    item.optionsField && item.optionsField.labelField
                      ? v[item.optionsField.labelField]
                      : v.label
                  }}
                </el-checkbox>
              </template>

              <template v-else-if="item.component === 'CheckboxGroup' && item.options">
                <el-checkbox-group v-model="formInline[item.field]">
                  <el-checkbox
                    v-for="v in item.options"
                    v-bind="{ ...item.componentProps }"
                    :key="`CheckboxGroup${v.value}`"
                    :label="
                      item.optionsField && item.optionsField.valueField
                        ? v[item.optionsField.valueField]
                        : v.value
                    "
                    @change="
                      () => {
                        changeVal(item)
                      }
                    "
                  >
                    {{
                      item.optionsField && item.optionsField.labelField
                        ? v[item.optionsField.labelField]
                        : v.label
                    }}
                  </el-checkbox>
                </el-checkbox-group>
              </template>

              <template v-else-if="item.component === 'Input'">
                <el-input
                  v-model="formInline[item.field]"
                  v-bind="{ ...item.componentProps }"
                  @change="
                    () => {
                      changeVal(item)
                    }
                  "
                />
              </template>

              <template v-else-if="item.component === 'InputNumber'">
                <el-input-number
                  v-model="formInline[item.field]"
                  v-bind="{ ...item.componentProps }"
                  @change="
                    () => {
                      changeVal(item)
                    }
                  "
                />
              </template>

              <template v-else-if="item.component === 'Select'">
                <el-select
                  v-model="formInline[item.field]"
                  v-bind="{ ...item.componentProps }"
                  @change="
                    () => {
                      changeVal(item)
                    }
                  "
                >
                  <el-option
                    v-for="v in item.options"
                    :key="`Select${v.value}`"
                    :label="
                      item.optionsField && item.optionsField.labelField
                        ? v[item.optionsField.labelField]
                        : v.label
                    "
                    :value="
                      item.optionsField && item.optionsField.valueField
                        ? v[item.optionsField.valueField]
                        : v.value
                    "
                  />
                </el-select>
              </template>

              <template v-else-if="item.component === 'Cascader' && item.options">
                <el-cascader
                  v-model="formInline[item.field]"
                  v-bind="{ ...item.componentProps }"
                  :options="item.options"
                  @change="
                    () => {
                      changeVal(item)
                    }
                  "
                />
              </template>

              <template v-else-if="item.component === 'Switch'">
                <el-switch
                  v-model="formInline[item.field]"
                  v-bind="{ ...item.componentProps }"
                  @change="
                    () => {
                      changeVal(item)
                    }
                  "
                />
              </template>

              <template v-else-if="item.component === 'Slider'">
                <el-slider
                  v-model="formInline[item.field]"
                  v-bind="{ ...item.componentProps }"
                  @change="
                    () => {
                      changeVal(item)
                    }
                  "
                />
              </template>

              <template v-else-if="item.component === 'TimePicker'">
                <el-time-select
                  v-model="formInline[item.field]"
                  v-bind="{ ...item.componentProps }"
                  @change="
                    () => {
                      changeVal(item)
                    }
                  "
                />
              </template>

              <template v-else-if="item.component === 'DatePicker'">
                <el-date-picker
                  v-model="formInline[item.field]"
                  v-bind="{ ...item.componentProps }"
                  @change="
                    () => {
                      changeVal(item)
                    }
                  "
                />
              </template>

              <template v-else-if="item.component === 'Rate'">
                <el-rate
                  v-model="formInline[item.field]"
                  v-bind="{ ...item.componentProps }"
                  @change="
                    () => {
                      changeVal(item)
                    }
                  "
                />
              </template>

              <template v-else-if="item.component === 'ColorPicker'">
                <el-color-picker
                  v-model="formInline[item.field]"
                  v-bind="{ ...item.componentProps }"
                  @change="
                    () => {
                      changeVal(item)
                    }
                  "
                />
              </template>

              <template v-else-if="item.component === 'Transfer' && item.options">
                <el-transfer
                  v-model="formInline[item.field]"
                  v-bind="{ ...item.componentProps }"
                  :data="item.options"
                  @change="
                    () => {
                      changeVal(item)
                    }
                  "
                />
              </template>
            </template>
          </el-form-item>
          <div style="display: inline-block">
            <slot v-if="$index === schema.length - 1"></slot>
          </div>
        </component>
      </component>
    </el-form>
  </div>
</template>

<script setup lang="ts" name="ComForm">
import { ElCol } from 'element-plus'
import { ElRow } from 'element-plus'
import { deepClone } from '@/utils'
import { set as objectSet } from 'lodash-es'
import {
  PropType,
  computed,
  useAttrs,
  ref,
  unref,
  watch,
  getCurrentInstance,
  nextTick,
  useSlots
} from 'vue'
const root = (getCurrentInstance() as any).proxy
const attrs = useAttrs()
const slots = useSlots()
const ruleForm = ref<Nullable<HTMLElement | any>>(null)
const emit = defineEmits(['register'])
const props = defineProps({
  // 布局展示的数据
  schema: {
    type: Array as PropType<FormSchemaConfig[]>,
    required: true,
    default: (): FormSchemaConfig[] => []
  },
  // 表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。
  labelWidth: {
    type: String,
    default: '150px'
  },
  // 是否需要栅格
  isCol: {
    type: Boolean,
    default: true
  }
})
const formInline = ref<IObj>({})
const schemaProps = ref<FormSchemaConfig[]>(props.schema as any)
watch(
  schemaProps,
  (val: FormSchemaConfig[]) => {
    setFormValue(val)
  },
  {
    immediate: true,
    deep: true
  }
)
watch(
  formInline.value,
  () => {
    nextTick(() => {
      emit('register', ruleForm.value, root, formInline.value)
    })
  },
  {
    immediate: true,
    deep: true
  }
)
function setFormValue(val: FormSchemaConfig[]) {
  for (const v of val) {
    if (!v.hidden) {
      const formValue = formInline.value[v.field]
      formInline.value[v.field] = formValue !== void 0 ? formValue : v.value || ''
    }
  }
}
const getBindValue = computed(() => {
  const bindValue = { ...attrs, ...props } as IObj
  delete bindValue.schema
  delete bindValue.labelWidth
  return bindValue
})
function getColValue(item: FormSchemaConfig) {
  const delArr = ['span']
  const obj = deepClone(item.colProps || {})
  for (const key in obj) {
    if (delArr.indexOf(key) !== -1) {
      delete obj[key]
    }
  }
  return obj
}
function getFormItemValue(item: FormSchemaConfig) {
  const delArr = ['label', 'prop']
  const obj = deepClone(item.formItemProps || {})
  for (const key in obj) {
    if (delArr.indexOf(key) !== -1) {
      delete obj[key]
    }
  }
  return obj
}
function changeVal(item: FormSchemaConfig) {
  if (item.onChange) {
    item.onChange({
      field: item.field,
      value: unref(formInline)[item.field]
    })
  }
}
function setProps(field: string, val: any, path: string) {
  schemaProps.value.map((v, i) => {
    if (v.field === field) {
      schemaProps.value[i] = objectSet(v, path, val)
      // objectSet(v, path, val)
      console.log(objectSet(v, path, val))
    }
  })
}
function addSchema(formCong: FormSchemaConfig, index?: number) {
  if (index !== void 0) {
    schemaProps.value.splice(index, 0, formCong)
    return
  }
  schemaProps.value.push(formCong)
}
function delSchema(index?: number) {
  if (index !== void 0) {
    schemaProps.value.splice(index, 1)
    return
  }
  schemaProps.value.pop()
}
function setValue(field: string, value: FormValueType) {
  formInline.value[field] = value
}
defineExpose({
  setProps,
  addSchema,
  delSchema,
  setValue
})
</script>

<style></style>
