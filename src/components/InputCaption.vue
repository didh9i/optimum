<template>
  <transition name="append-between">
    <div class="input-caption t-caption" v-if="props.visible">
      <span
        v-for="item in props.list"
        :key="item.text"
        class="t-caption"
        :style="{ color: `var(--system-${item.status})`}"
      >
        {{ item.text }}
      </span>
    </div>
  </transition>
</template>

<script
  setup
  lang="ts"
>
import UIStatus from '@/models/status'

interface Props {
  visible: boolean
  list: Array<{
    status: UIStatus
    text: string
  }>
}

const props = defineProps<Props>()
</script>

<style
  lang="scss"
  scoped
>
.input-caption {
  display: flex;
  flex-flow: column;
  gap: 2px;
  margin: -8px 0;
  padding: 4px 8px;
  max-width: 240px;
  height: fit-content;
  background-color: var(--control-text-background);
  border-radius: 4px;
  border: 1px solid var(--control-text-border);

  span {
    transition: 333ms
  }
}
</style>
