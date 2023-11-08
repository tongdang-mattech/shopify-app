<template lang="">
  <div class="input-search">
    <input
      class="input"
      placeholder="Enter a steet, city, region, or place"
      v-model="valueQuery"
      :style="{ border: showMenu ? '2px solid #448aff' : undefined }"
      @focus="showMenu = true"
      @blur="deactiveMenu"
    />
    <v-icon class="icon1" icon="fa-solid fa-location-dot"></v-icon>
    <v-icon class="icon2" icon="fa-solid fa-xmark" @click="clear" v-if="valueQuery"></v-icon>
    <div class="drop-down" v-if="valueQuery && showMenu">
      <div
        class="drop-down-item"
        v-for="dataDrop in searchData"
        :key="dataDrop.mapbox_id"
        @click="handleSelect(dataDrop)"
      >
        <div>
          {{ dataDrop.name }}
        </div>
        <div class="text-subtitle-2" v-if="dataDrop.context">
          <span v-if="dataDrop.context.country">
            {{ dataDrop.context.country.name }}
          </span>
          <span v-if="dataDrop.context.region && dataDrop.context.country"> , </span>
          <span v-if="dataDrop.context.region">
            {{ dataDrop.context.region.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { access_token, session_token } from '@/utils/mapbox'
import { debounce } from '../utils/debounce'
import { watch } from 'vue'
const props = defineProps({
  clearValueAfterSelect: Boolean
})
const emit = defineEmits(['update:select'])
const showMenu = ref(false)
const valueQuery = ref('')
const searchData = ref('')
async function getValueData(mapbox_id) {
  const res = await axios.get(`https://api.mapbox.com/search/searchbox/v1/retrieve/${mapbox_id}`, {
    params: { access_token, session_token }
  })
  return res.data
}
const getData = debounce(async (params) => {
  const res = await axios.get(`https://api.mapbox.com/search/searchbox/v1/suggest`, {
    params: { q: params, language: 'en', access_token, session_token, poi_category: 'poi' }
  })
  searchData.value = res.data.suggestions
})
watch(valueQuery, async (params) => {
  if (!params) {
    return
  }
  getData(params)
})
const handleSelect = (item) => {
  getValueData(item.mapbox_id).then((res) => {
    if (res.features[0] && res.features[0].geometry) {
      item.center = res.features[0].geometry.coordinates
    }
    emit('update:select', item)
  })
  if (props.clearValueAfterSelect) valueQuery.value = ''
  else valueQuery.value = item.name
  showMenu.value = false
}
const clear = () => {
  setValue('')
}
const setValue = (value) => {
  valueQuery.value = value
}
defineExpose({
  setValue
})
</script>
<style scoped>
.input-search {
  position: relative;
  max-width: 720px;
  width: 100%;
}
.input {
  width: 100%;
  background-color: white;
  border: 1px solid #e2e1e8;
  padding: 15px 50px;
  height: 64px;
  border-radius: 12px;
  position: relative;
}
.icon1 {
  position: absolute;
  top: 18px;
  left: 18px;
  color: #425aff;
}

.icon2 {
  position: absolute;
  top: 18px;
  right: 18px;
}
.drop-down {
  position: absolute;
  border: 2px solid #448aff;
  border-top: none;
  margin-top: -10px;
  padding-top: 10px;
  z-index: 100;
  width: 100%;
  background-color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.drop-down-item {
  height: 64px;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  border-top: solid 1px rgba(0, 0, 0, 0.09);
  cursor: pointer;
  text-align: left;
  justify-content: center;
}
</style>
