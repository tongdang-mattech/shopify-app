<template lang="">
  <v-navigation-drawer
    v-model="drawer"
    location="right"
    temporary
    disable-route-watcher
    width="700"
  >
    <div class="py-4 d-flex flex-column full-height">
      <div class="px-4 flex-grow-0 d-flex">
        <span class="text-h4">Set Location</span>
        <v-spacer></v-spacer>
        <v-btn variant="text" icon @click="close()">
          <v-icon icon="fa-solid fa-xmark"></v-icon>
        </v-btn>
      </div>
      <div class="px-4 py-4 flex-grow-0">
        <SearchInput @update:select="onSelect" ref="input_search" />
      </div>
      <div class="flex-grow-1">
        <Map
          styleMap="mapbox://styles/mapbox/streets-v12"
          class="full-height pickOnMap__map-container"
          @map-loaded="onMapLoad"
        ></Map>
      </div>
      <div class="flex-grow-0 px-4 pt-4 d-flex">
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!feature"
          color="primary"
          variant="flat"
          size="large"
          rounded="xl"
          class="text-none"
          @click="handleSelect()"
        >
          Done
        </v-btn>
      </div>
    </div>
  </v-navigation-drawer>
</template>
<script setup>
import { access_token } from '@/utils/mapbox'
import { Map } from '@/components/Map'
import { ref } from 'vue'
import SearchInput from '@/components/SearchInput.vue'
import { onUnmounted } from 'vue'
import { debounce } from '@/utils/debounce'
import axios from 'axios'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/app'
function isCheck(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2)
}

const appStore = useAppStore()
const { selectedLocations } = storeToRefs(appStore)
const drawer = ref(false)
const feature = ref(null)
const type_edit = ref('create')
const type_index = ref(0)
let map



function onMove() {
  let center = map.getCenter()
  getDataByLocation(center.lng, center.lat)
}
const input_search = ref(null)
function onMapLoad(x) {
  map = x
  map.on('moveend', onMove)
}
onUnmounted(() => {
  if (map) {
    map.off('moveend', onMove)
  }
})
function initValue(value) {
  feature.value = value
  if (value) {
    onSelect(value)
    input_search.value.setValue(value.name)
  }
}
function onSelect(item) {
  if (item.center) {
    map.setCenter(item.center)
    map.setZoom(13)
  }
}
function open({ value, type, index }) {
  initValue(value)
  type_edit.value = type
  type_index.value = index
  drawer.value = true
}
function close() {
  initValue(null)
  type_edit.value = 'create'
  type_index.value = 0
  drawer.value = false
}
const getDataByLocation = debounce(async (longitude, latitude) => {
  const res = await axios.get(`https://api.mapbox.com/search/searchbox/v1/reverse`, {
    params: { access_token, longitude, latitude }
  })
  if (res && res.data && res.data.features && res.data.features.length > 0) {
    let { properties } = res.data.features[0]
    feature.value = {
      name: properties.name,
      mapbox_id: properties.mapbox_id,
      country: properties.context.country.name,
      center: [longitude, latitude]
    }
    input_search.value.setValue(properties.name)
  }
})
const handleSelect = () => {
  for (let i = 0; i < selectedLocations.value.length; i++) {
    if (isCheck(selectedLocations.value[i], feature.value)) {
      return selectedLocations.value
    }
  }
  if (type_edit.value === 'create') {
    selectedLocations.value.push(feature.value)
  } else if (type_edit.value === 'update' && type_index.value >= 0) {
    selectedLocations.value[type_index.value] = feature.value
  }
  close()
}
defineExpose({
  initValue,
  open,
  close
})
</script>
<style scoped>
.pickOnMap__map-container:after,
.pickOnMap__map-container:before {
  box-sizing: border-box;
  content: '';
  display: block;
  position: absolute;
  z-index: 1;
}
.pickOnMap__map-container:before {
  border: 2px solid #425aff;
  border-radius: 30px;
  bottom: 50%;
  height: 33px;
  left: 50%;
  width: 0;
}
.pickOnMap__map-container:after {
  background: #fff;
  border: 18px solid #425aff;
  border-radius: 30px;
  bottom: calc(50% + 27px);
  height: 54px;
  left: calc(50% - 26px);
  width: 54px;
}
</style>
