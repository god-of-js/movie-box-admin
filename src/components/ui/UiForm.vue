<script lang="ts" setup>
import { computed } from 'vue'
import useVuelidate, { ValidationArgs } from '@vuelidate/core'

interface Props {
  rules?: ValidationArgs
  formData: Record<string, unknown>
  autocomplete?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  rules: () => ({})
})

const emit = defineEmits<{
  (e: 'formSubmit', p: typeof props.formData): void
}>()

const v$ = useVuelidate<typeof props.formData>(props.rules, props.formData, {
  $autoDirty: true
})

function validateAndSubmit() {
  if (props.disabled) return
  v$.value.$validate()
  if (!v$.value.$error) emit('formSubmit', props.formData)
}

const formErrors = computed(() => {
  const errorList: Record<string, string[]> = {}
  v$.value.$errors.forEach((err) => {
    errorList[err.$propertyPath] = [
      typeof err.$message === 'string' ? err.$message : err.$message.value
    ]
  })
  return errorList
})

const autocomplete = computed(() => (props.autocomplete ? 'on' : undefined))
</script>

<template>
  <form class="ui-form" :autocomplete="autocomplete" @submit.prevent="validateAndSubmit">
    <div class="main">
      <slot
        :form-errors="formErrors"
        :form-submit="validateAndSubmit"
        :has-errors="v$.$error"
        :is-dirty="v$.$dirty"
      />
    </div>

    <div class="actions">
      <slot
        name="bottom"
        :form-errors="formErrors"
        :form-submit="validateAndSubmit"
        :has-errors="v$.$error"
        :is-dirty="v$.$dirty"
      />
    </div>
  </form>
</template>

<style lang="scss" scoped>
.ui-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.actions {
  flex-grow: 0;
}
</style>
