<template>
  <component
    :is="props.item.path ? 'router-link' : 'li'"
    class="list-view__item"
    :class="{ 'list-view__item_active': $route.path === props.item.path }"
    :to="props.item.path ? { path: props.item.path } : undefined"
    @click="$emit('item-click', $event)"
    @mousedown.prevent
  >
    <div
      class="list-view__item-button"
      :style="{ padding: props.padding }"
    >
      <img
        v-if="props.item.icon"
        class="list-view__item-icon"
        :src="props.item.icon"
        alt=""
      >
      <span class="t-subtitle" v-if="props.item.name">{{ props.item.name }}</span>
    </div>
  </component>
</template>

<script setup lang="ts">
interface Props {
  item: {
    path?: string
    icon?: string
    name?: string
  }
  padding?: string
}

const props = defineProps<Props>()
</script>
