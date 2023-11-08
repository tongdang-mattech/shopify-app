<template>
  <component :is="currentLayoutComponent" :configMap="configMap" class="main-content">
    <component :is="currentMaskComponent" class="full-height">
      <Map
        class="full-height full-width"
        :styleMap="map_style"
        :lock="configMap.map_control.lock"
        @map-loaded="onMapLoad"
        v-model:bearing="map_bearing"
        v-model:zoom="map_zoom"
        preserveDrawingBuffer
      >
        <ShowPathPoint
          fitBounds
          :points="configMap.points"
          :show-connected="configMap.point_connected"
          :show-marker="configMap.element.marker"
          :marker="configMap.element.element_marker"
          :color="configMap.element.element_color"
        />
      </Map>
    </component>
  </component>
</template>
<script setup>
import { exportMapbox } from '@/components/Map/print'
import { Map, ShowPathPoint } from '@/components/Map'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { colors } from '@/utils/sidebarData'
import { layouts, masks } from './constant'
const props = defineProps({
  configMap: { type: Object, default: () => ({ color: 'dark' }) }
})
const emit = defineEmits(['update:configMap'])
const currentLayoutComponent = computed(() => {
  return layouts[props.configMap.layout.type] || layouts.PantomineCardLayout
})
const currentMaskComponent = computed(() => {
  return masks[props.configMap.layout.mask] || masks.None
})

// const map_zoom = ref(2)
const map_bearing = ref(0)
// const map_clock = ref(false)
const map_style = computed(() => {
  let color = colors.find((x) => {
    return x.id == props.configMap.color
  })
  if (!color) return ''
  return color.style
})
let map
function onMapLoad(x) {
  map = x
}
async function resize() {
  await nextTick()
  map.resize()
}
const map_zoom = computed({
  get() {
    return props.configMap.map_control.zoom
  },
  set(value) {
    let temp = Object.assign({}, props.configMap)
    temp.map_control.zoom = value
    emit('update:configMap', temp)
  }
})
watch(
  () => props.configMap.layout.padding,
  () => {
    if (!map) return
    resize()
  }
)
watch(()=>props.configMap.map_control.bearing,(newValue)=>{
  map_bearing.value = newValue
})
function toImage() {
  return exportMapbox(map)
}
defineExpose({
  resize,
  toImage
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
