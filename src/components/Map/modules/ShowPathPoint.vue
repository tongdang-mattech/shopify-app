<template lang="">
  <div></div>
</template>
<script setup>
import { computed, inject, onMounted, onUnmounted, watch } from 'vue'
import bbox from '@turf/bbox'
import * as turf from '@turf/turf'
import { markers, elements } from '@/utils/sidebarData'
const LOCATION_ID = 'location-map'
const props = defineProps({
  points: {
    type: Array,
    default: () => []
  },
  showConnected: Boolean,
  showMarker: Boolean,
  marker: { type: String, default: 'dot' },
  color: String,
  fitBounds: Boolean
})
let map = null
const getMap = inject('getMap')
onMounted(() => {
  getMap((x) => {
    map = x
    onInit()
  })
})
onUnmounted(() => {
  onDestroy()
})
const colors = computed(() => {
  let color = elements.find((x) => {
    return x.id == props.color
  })
  if (!color) return ''
  return color.color
})
function onInit() {
  if (map.getLayer(LOCATION_ID + '-layer-point')) {
    map.removeLayer(LOCATION_ID + '-layer-point')
  }
  if (map.getSource(LOCATION_ID + '-source')) {
    map.removeSource(LOCATION_ID + '-source')
  }
  map.addSource(LOCATION_ID + '-source', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: []
    }
  })
  setLocation(props.points)
  setLayerConnected()
  setMaker(props)
}
watch(() => props, setMaker, { deep: true })
function setMaker({ marker, color }) {
  if (!marker) return
  if (!map) return
  if (map.getLayer(LOCATION_ID + '-layer-point')) {
    map.removeLayer(LOCATION_ID + '-layer-point')
  }
  if (!props.showMarker) {
    return
  }
  let icon = markers.find((x) => x.id == marker)
  if (!icon) {
    return
  }
  let src = icon.src
  switch (color) {
    case 'black_yellow':
      src = icon.src.replace('black-white', 'black-yellow')
      break
    case 'blue_white':
      src = icon.src.replace('black-white', 'blue-white')
      break
    case 'dark_blue_white':
      src = icon.src.replace('black-white', 'darkblue-white')
      break
    case 'wine_white':
      src = icon.src.replace('black-white', 'darkred-white')
      break
    case 'red_white':
      src = icon.src.replace('black-white', 'red-white')
      break
    case 'white_black':
      src = icon.src.replace('black-white', 'white-black')
      break
    case 'white_wine':
      src = icon.src.replace('black-white', 'white-darkred')
      break
    case 'white_red':
      src = icon.src.replace('black-white', 'white-red')
      break
    case 'yellow_black':
      src = icon.src.replace('black-white', 'yellow-black')
      break
    default:
      break
  }
  map.loadImage(src, (error, image) => {
    if (error) throw error

    // Add the image to the map style.
    const id = 'custom-' + icon.id + '-' + color + '-' + Date.now()
    map.addImage(id, image)

    // Add a layer to use the image to represent the data.
    map.addLayer({
      id: LOCATION_ID + '-layer-point',
      type: 'symbol',
      source: LOCATION_ID + '-source',
      layout: {
        'icon-image': id, // reference the image
        'icon-size': 0.1
      }
    })
  })
}
watch(() => props, setLayerConnected, { deep: true })
function setLayerConnected() {
  if (!map) return
  for (let i = 0; i <= 3; i++) {
    if (map.getLayer(LOCATION_ID + '-layer-line-' + i)) {
      map.removeLayer(LOCATION_ID + '-layer-line-' + i)
    }
  }
  if (!props.showConnected) {
    return
  }
  ;[-1, 0, 1, 0].forEach((x, i) => {
    map.addLayer({
      id: LOCATION_ID + '-layer-line-' + i,
      type: 'line',
      source: LOCATION_ID + '-source',
      layout: {
        'line-cap': i === 3 ? 'butt' : 'square'
      },
      paint: {
        'line-color': i === 3 ? colors.value[0] : colors.value[1],
        'line-width': i === 3 ? 3 : 2,
        'line-opacity': 0.8,
        'line-offset': x * 3
      }
    })
  })
}

watch(() => props.points, setLocation)

function setLocation(points) {
  if (!points) {
    return
  }
  if (!map) {
    return
  }
  let source = map.getSource(LOCATION_ID + '-source')
  if (!source) {
    return
  }
  let features = []
  let before_point = null
  points.forEach((point) => {
    if (!point[0] || !point[1]) {
      return
    }
    let temp_point = {
      type: 'Feature',
      properties: {},
      geometry: {
        coordinates: point,
        type: 'Point'
      }
    }
    features.push(temp_point)
    if (before_point) {
      let curve = setCurve(before_point, point)
      features.push(curve)
    }
    before_point = point
  })
  let data = {
    type: 'FeatureCollection',
    features: features
  }
  source.setData(data)
  if (props.fitBounds && data.features.length > 0) {
    console.log('🚀 ~ setLocation ~ data', data, data.features[0].geometry.coordinates)
    if (data.features.length == 1) {
      map.setCenter(data.features[0].geometry.coordinates)
      map.setZoom(10)
    } else {
      let bounds = bbox(data)
      if (bounds)
        map.fitBounds(bounds, {
          padding: 50,
          duration: 0
        })
    }
  }
}
function onDestroy() {}

function setCurve(start, finish) {
  let line = turf.lineString([start, finish])
  let route = turf.projection.toWgs84(line)
  const lineD = turf.lineDistance(route, { units: 'kilometers' })
  const mp = turf.midpoint(route.geometry.coordinates[0], route.geometry.coordinates[1])
  const center = turf.destination(
    mp,
    lineD,
    turf.bearing(route.geometry.coordinates[0], route.geometry.coordinates[1]) - 90
  )
  const lA = turf.lineArc(
    center,
    turf.distance(center, route.geometry.coordinates[0]),
    turf.bearing(center, route.geometry.coordinates[1]),
    turf.bearing(center, route.geometry.coordinates[0])
  )
  return turf.projection.toMercator(lA)
}
</script>
<style lang=""></style>
