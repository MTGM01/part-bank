<script setup>
defineProps({
  isLoading: {
    type: Boolean
  },
  disable: {
    type: Boolean
  },
  text: {
    type: String,
    required: true
  },
  classBtn: {
    type: String
  },
  onClick: {
    type: Function
  },
  type: {
    type: String,
    default: 'button'
  }
})
</script>
<template lang="">
  <button :class="`${classBtn} button`" type="submit" :disabled="disable" @click="onClick">
    {{ text }}
    <div v-show="isLoading" class="button__loader"></div>
  </button>
</template>
<style lang="scss">
.button {
  @include flexBox($dir: row, $align: center, $justify: center, $gap: 1rem);
  outline: none;
  background-color: var(--color-primary-500);
  cursor: pointer;
  border: none;
  border-radius: 8px;
  @include font(1rem, 700);
  color: var(--color-text-on-primary);
  min-width: 13rem;
  height: 3rem;

  &:hover {
    filter: brightness(130%);
    transition: all 300ms linear;
  }

  &_black {
    background: var(--color-primary-50, #eceef6) !important;
    color: var(--color-black-500, #3c4351) !important;
  }

  &__loader {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    position: relative;
    animation: rotate 1s linear infinite
  }

  &__loader::before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    inset: 0px;
    border-radius: 50%;
    border: 5px solid #FFF;
    animation: prixClipFix 2s linear infinite;
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg)
  }
}

@keyframes prixClipFix {
  0% {
    clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0)
  }

  25% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0)
  }

  50% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%)
  }

  75% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%)
  }

  100% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0)
  }
}
</style>
