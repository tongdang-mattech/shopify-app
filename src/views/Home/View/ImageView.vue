<template>
  <component :is="currentLayoutComponent" :configMap="configMap" class="main-content">
    <component :is="currentMaskComponent" class="full-height">
      <img :src="configMap.image" class="full-height full-width" />
    </component>
  </component>
</template>
<script setup>
import { computed } from 'vue'
import { layouts, masks } from './constant'
const props = defineProps({
  configMap: { type: Object, default: () => ({ color: 'dark' }) },
  image: {}
})

const currentLayoutComponent = computed(() => {
  return layouts[props.configMap.layout.type] || layouts.PantomineCardLayout
})
const currentMaskComponent = computed(() => {
  return masks[props.configMap.layout.mask] || masks.None
})
</script>
<style scoped>
.main-content {
  background-size: cover;
  width: 100%;
  height: 100%;
}
</style>
<style>
.full-height {
  height: 100%;
}
.full-width {
  width: 100%;
}
</style>
