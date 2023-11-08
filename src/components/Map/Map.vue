<template lang="">
  <div class="position-relative">
    <div class="map-viewer">
      <div ref="mapContainer" class="map-content"></div>
      <slot v-if="loaded"></slot>
    </div>
  </div>
</template>
<script setup>
import mapboxgl from 'mapbox-gl'
import { debounce } from '@/utils/debounce'
import { onMounted, ref, watch, provide } from 'vue'
const emit = defineEmits(['map-loaded', 'update:zoom'])
const props = defineProps({
  accessToken: {
    type: String,
    default:
      'pk.eyJ1IjoibWFsbGFiYXJpdXMiLCJhIjoiY2xjYmZod2phMWw2YzNvcDJyc2ZjczN3ZyJ9.Pza9BDufdnCIiAURobTshw'
  },
  styleMap: { default: 'mapbox://styles/mallabarius/clix8u7q7006s01qq820ohqa7' },
  center: { type: Array, default: () => [105.85713521298624, 21.071222169901418, 0] },
  zoom: { type: Number, default: 5 },
  bearing: { type: Number, default: 0 },
  lock: Boolean,
  preserveDrawingBuffer: Boolean
})
const mapContainer = ref(null)
let map = null
let loaded = ref(false)
let items_callbackWhenDone = []

onMounted(() => {
  checkAccessToken(props.accessToken)
  init()
})
watch(() => props.accessToken, checkAccessToken, { immediate: true })
watch(() => props.lock, lockMap)
watch(
  () => props.styleMap,
  (value) => {
    if (!map) return
    if (!value) return
    loaded.value = false
    map.setStyle(value)
    map.resize()
    setTimeout(() => {
      loaded.value = true
      if (items_callbackWhenDone && items_callbackWhenDone.length > 0) {
        items_callbackWhenDone.forEach((cb) => cb(map))
      }
    }, 100)
    map.once('style.load', function () {
      // Emit for parent component
      setTimeout(() => {
        loaded.value = true
        if (items_callbackWhenDone && items_callbackWhenDone.length > 0) {
          items_callbackWhenDone.forEach((cb) => cb(map))
        }
      }, 100)
    })
  }
)
watch(
  () => props.center,
  (center) => {
    if (!center || !center[0] || !center[1]) return
    if (!map) return
    map.setCenter(center)
  }
)
watch(
  () => props.zoom,
  (value) => {
    if (value < 0 || value > 22) return
    if (!map) return
    map.setZoom(value)
  }
)
watch(
  () => props.bearing,
  debounce((bearing) => {
    if (!map) return
    map.easeTo({ bearing })
  }, 100)
)
function checkAccessToken(value) {
  if (!value) {
    return
  }
  mapboxgl.accessToken = value
}
function lockMap(lock) {
  if (!map) return
  if (lock) {
    map.boxZoom.disable()
    map.scrollZoom.disable()
    map.dragPan.disable() //
    map.dragRotate.disable()
    map.keyboard.disable()
    map.doubleClickZoom.disable()
    map.touchZoomRotate.disable()
  } else {
    map.boxZoom.enable()
    map.scrollZoom.enable()
    map.dragPan.enable() //
    map.dragRotate.enable()
    map.keyboard.enable()
    map.doubleClickZoom.enable()
    map.touchZoomRotate.enable()
  }
}
function init() {
  map = new mapboxgl.Map({
    container: mapContainer.value,
    style: props.styleMap || 'mapbox://styles/mapbox/streets-v12',
    attributionControl: false,
    bearing: props.bearing,
    preserveDrawingBuffer: props.preserveDrawingBuffer
  })

  map.setCenter(props.center)
  map.setZoom(props.zoom)
  lockMap(props.lock)
  map.once('load', () => {
    map.dragRotate.disable()
    map.touchZoomRotate.disableRotation()
    // Emit for parent component
    map.resize()
    setTimeout(() => {
      loaded.value = true
      if (items_callbackWhenDone && items_callbackWhenDone.length > 0) {
        items_callbackWhenDone.forEach((cb) => cb(map))
      }
      emit('map-loaded', map)
    }, 100)
  })

  map.on('zoomend', () => {
    emit('update:zoom', map.getZoom())
  })
}
provide(/* key */ 'getMap', /* value */ getMap)
function getMap(callback) {
  items_callbackWhenDone.push(callback)
  if (loaded.value) {
    callback(map)
  }
}
</script>
<style scoped>
.map-viewer {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
}
.map-content {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
