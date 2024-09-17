<template>
  <Form action="#" :class="`${mainClass}__form login-form`" :validation-schema="validation" @submit="(inputData) => {
    onSubmit(inputData)
  }
    ">
    <slot name="title"></slot>
    <div :class="layoutClass">
      <template v-for="i in inputs" v-bind:key="i">
        <base-input :type="i.type" :id="i.id" :label="i.label" :name="i.name" :placeHolder="i.placeHolder"
          :elementClass="i.elementClass" :border="i.border" :labelColor="i.labelColor" :icon="i.icon" :as="i.as"
          :row="i.row" :defaultValue="i.defaultValue" @passData="(e) => {
            inputData[i.name] = e
          }
            ">
          <template #icon v-if="i.icon">
            <slot name="icon"> </slot>
          </template>
        </base-input>
      </template>
      <slot name="textarea"></slot>
    </div>
    <div :class="layoutClass">
      <template v-for="(button, i) in buttons" :key="i">
        <base-button :disable="button.disable" :text="button.text" :classBtn="button.class" :onClick="button.onClick"
          :isLoading="isLoading" />
      </template>
    </div>
  </Form>
</template>
<script setup>
import { Form } from 'vee-validate'
const inputData = {}
const props = defineProps({
  isLoading: {
    type: Boolean
  },
  buttons: {
    type: Array,
    required: true
  },
  inputs: {
    type: Array,
    required: true
  },
  textArea: {
    type: Object
  },
  validation: {
    type: Object
  },
  onSubmit: {
    type: Function,
    required: true
  },
  mainClass: {
    type: String,
    required: true
  },
  layoutClass: {
    type: String,
    required: true
  }
})

const layoutClass = props.layoutClass
</script>
<style lang="scss">
.login-form {
  @include flexBox($dir: column, $align: center, $justify: flex-start, $gap: 8px);

  &__inputs {
    width: 100%;
    @include position($pos: relative);
  }

  &__trigger-icon {
    fill: var(--color-black-500);
    @include position($pos: absolute, $left: 0.5rem, $bottom: 2.25rem);
    cursor: pointer;
    left: 8px;
  }
}

.login-form-layout {
  @include flexBox($dir: column, $align: stretch);
  width: 100%;
}

.account-creation-layout {
  @include flexBox($dir: row, $gap: 2rem 2.5rem, $justify: flex-end);
  width: 100%;
  flex-wrap: wrap;
}
</style>
