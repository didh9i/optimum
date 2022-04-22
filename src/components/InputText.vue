<template>
  <label
    class="input-text"
    :class="props.status && `input-text_${props.status}`"
  >
    <span
      v-if="props.header"
      class="input-text__header"
    >
      {{ props.header }}
    </span>
    <span
      v-if="props.type === 'password'"
      class="input-text__show-password"
      :class="{
        'input-text__show-password_empty': !props.modelValue,
        'input-text__show-password_active': type === 'text'
      }"
      @pointerdown.stop.prevent="togglePasswordVisibility"
    />
    <img
      v-if="props.icon"
      class="input-text__icon"
      :src="props.icon"
      alt=""
    >
    <input
      :value="props.modelValue"
      :type="type"
      :autocomplete="props.autocomplete"
      :maxlength="props.max"
      :placeholder="props.placeholder"
      @input="update"
      @blur="inputBlur"
      @focus="$emit('input-focus')"
    >
    <slot />
  </label>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UIStatus from '@/models/status'

type InputTextType = 'text' | 'password' | 'email'

interface Props {
  modelValue: string
  header?: string
  type?: InputTextType
  autocomplete?: string
  max?: string
  status?: UIStatus
  icon?: string
  placeholder?: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'input-focus'): void
  (e: 'input-blur'): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const update = (event: InputEvent) => {
  const target = event.target as HTMLInputElement | undefined
  if (target) {
    emits('update:modelValue', target.value)
  }
}

const type = ref<InputTextType>(props.type || 'text')

const togglePasswordVisibility = type.value === 'password' ? () => {
  type.value = type.value === 'password' ? 'text' : 'password'
} : null

const inputBlur = type.value === 'password' ? () => {
  type.value = 'password'
  emits('input-blur')
} : () => { emits('input-blur') }
</script>

<style lang="scss" scoped>
.input-text {
  position:      relative;
  display:       flex;
  flex-flow:     column;
  border-radius: 4px;
  width:         240px;
  max-width:     100%;

  &:before {
    content:          ' ';
    position:         absolute;
    width:            100%;
    height:           1px;
    bottom:           0;
    z-index:          1;
    clip-path:        inset(-8px 0 0 0 round 4px);
    background-color: var(--control-text-detail);
    transition:       var(--soft-dismiss-t1);
  }

  input {
    position:         relative;
    appearance:       none;
    background-color: var(--control-text-background);
    border:           1px solid var(--control-text-border);
    border-radius:    4px;
    height:           32px;
    padding:          4px 11px 6px;
    color:            var(--control-text-color);
    transition:       background-color var(--soft-dismiss-t1), border var(--soft-dismiss-t1);

    &::placeholder {
      color: var(--control-text-placeholder);
    }

    &:focus {
      outline: none;
    }
  }

  &__header {
    margin-bottom: 8px;
  }

  &__icon {
    position:          absolute;
    width:             16px;
    height:            16px;
    left:              8px;
    bottom:            8px;
    z-index:           1;
    filter:            var(--t-text);
    user-select:       none;
    -webkit-user-drag: none;
    cursor:            text;

    & + input {
      padding-left: 29px;
    }
  }


  &__show-password {
    position:   absolute;
    display:    block;
    right:      2px;
    bottom:     2px;
    width:      32px;
    height:     28px;
    padding:    2px;
    z-index:    2;
    transition: var(--soft-dismiss-t1);
    cursor:     pointer;

    & + input {
      padding-right: 37px;
    }

    &::after {
      content:             ' ';
      display:             block;
      min-width:           28px;
      min-height:          24px;
      border-radius:       4px;
      background-color:    transparent;
      background-image:    url('~@/icons/password-visibility.svg');
      background-position: center;
      background-repeat:   no-repeat;
      transition:          var(--soft-dismiss-t1);
    }

    &:hover::after {
      background-color: var(--subtle-hover);
    }

    &_active {
      &::after {
        background-color: var(--subtle-pressed);
      }
    }

    &_empty {
      opacity: 0;
    }
  }

  &:hover {
    input {
      background-color: var(--control-text-hover-background);
    }
  }

  &:focus-within input, & input:active, & input:focus {
    background-color: var(--control-text-active-background);
    border:           1px solid var(--control-text-active-border);
  }

  &:focus-within {
    input {
      background-color: var(--control-text-active-background);
      border:           1px solid var(--control-text-active-border);
    }

    &:before {
      height:           2px;
      background-color: var(--control-text-active-detail);
    }
  }

  &_attention:before {
    background-color: var(--system-attention) !important;
  }

  &_success:before {
    background-color: var(--system-success) !important;
  }

  &_caution:before {
    background-color: var(--system-caution) !important;
  }

  &_critical:before {
    background-color: var(--system-critical) !important;
  }
}
</style>
