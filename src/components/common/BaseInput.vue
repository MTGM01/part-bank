<script setup>
import { ref } from 'vue'
import { Field, ErrorMessage } from 'vee-validate'
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  type: {
    type: String
  },
  as: { type: String },
  row: { type: Number },
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  placeHolder: {
    type: String,
    required: true
  },
  elementClass: {
    type: String
  },
  labelColor: {
    type: String
  },
  border: {
    type: String
  },
  icon: {
    type: Boolean
  },
  inputClass: {
    type: String
  },
  defaultValue: {
    type: [String, Number]
  }
})

const label_color = ref(props.labelColor)

function makeInputFocus() {
  label_color.value = 'var(--color-black-500)'
}

function makeInputUnFocus() {
  label_color.value = props.labelColor
}

const className = props.as == 'textarea' ? 'input-container__textarea' : 'input-field__input'
</script>
<!-- step-template__input-container input-field = app.config.isCustomElement = -->
<!-- login-form__inputs input-field = login -->
<template>
  <div :class="`${elementClass}`">
    <label :for="id" class="input-field__label"> {{ label }}</label>
    <Field
      :validate-on-input="true"
      :type="type"
      :as="as"
      :id="id"
      :placeholder="placeHolder"
      :name="name"
      :class="className"
      :value="defaultValue"
      :row="row"
      @focus="makeInputFocus"
      @blur="makeInputUnFocus"
      @change="$emit('passData', e?.target?.value)"
    />
    <div class="input-field__error-msg">
      <ErrorMessage :name="name" />
    </div>
    <slot name="icon"></slot>
  </div>
</template>

<style lang="scss" scoped>
.input-field {
  @include flexBox($dir: column, $align: flex-start, $gap: 4px);
  &__input {
    outline: none;
    width: 100%;
    height: 48px;
    padding: 0 8px;
    background: var(--color-surface-LightBlue, #f9fafb);
    border: v-bind(border);
    border-radius: 6px;
    &::placeholder {
      color: var(--color-black-100);
    }
    &:focus {
      border-radius: 0.375rem;
      border: 2px solid var(--color-primary-200, #a8afd3);
      background: var(--color-surface-LightBlue, #f9fafb);
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
  &__label {
    @include font(16px, 400);
    color: v-bind(label_color);
  }

  &__error-msg {
    height: 1.125rem;
    color: var(--color-fail-500, #eb482b);
    text-align: right;
    @include font($size: 0.75rem, $weight: 400);
  }
}
</style>
