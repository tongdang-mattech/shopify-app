<template>
  <div class="layout" @click="showMenu = false">
    <div class="top">
      <h1 class="text-bold">Set Location</h1>
      <div class="color-light text-light">
        Search for any place in the world. You can even choose multiple locations.
      </div>
    </div>
    <div class="d-flex flex-column align-center">
      <div
        v-for="selectData in selectedLocations"
        :key="selectData.mapbox_id"
        class="input-container"
      >
        <div class="list-item">
          <div>
            {{ selectData.name }}
          </div>
          <div class="text-subtitle-2" v-if="selectData.context">
            <span v-if="selectData.context.country">
              {{ selectData.context.country.name }}
            </span>
          </div>
        </div>

        <v-icon class="icon1" icon="fa-solid fa-location-dot"></v-icon>
        <div class="input-delete">
          <v-icon
            variant="text"
            @click="handleDelete(selectData.mapbox_id)"
            icon="fa-solid fa-xmark"
          ></v-icon>
        </div>
      </div>
      <SearchInput @update:select="handleSelect" clearValueAfterSelect />
    </div>
    <!-- <div v-else>
          <InputLocation />
        </div> -->
  </div>
</template>

<script setup>
import SearchInput from '@/components/SearchInput.vue'
import { ref, watch } from 'vue'
import axios from 'axios'
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
// import { v4 as uuidv4 } from 'uuid'
const route = useRoute()
const appStore = useAppStore()
const { selectedLocations } = storeToRefs(appStore)
const showMenu = ref(false)

const handleSelect = (item) => {
  let check = false
  for (let i = 0; i < selectedLocations.value.length; i++) {
    if (selectedLocations.value[i].mapbox_id === item.mapbox_id) {
      check = true
      break
    }
  }
  if (!check) selectedLocations.value.push(item)
}

const handleDelete = (data) => {
  const newList = selectedLocations.value.filter((item) => item.mapbox_id !== data)
  selectedLocations.value = newList
}

watch(
  selectedLocations,
  (val) => {
    appStore.nextStepAble[route.name] = val.length > 0
  },
  { deep: true }
)
</script>

<style scoped>
.layout {
  margin: auto;
  text-align: center;
  width: 100%;
  height: 100%;
  padding-left: 10px;
  padding-right: 10px;
}

.top {
  padding-top: 110px;
  padding-bottom: 60px;
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

.input-search {
  position: relative;
  max-width: 720px;
  width: 100%;
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

.wrapper {
  margin-top: 180px;
}
li {
  list-style: none;
  height: 64px;
  padding: 12px 24px;
  border: 1px solid #e2e1e8;
  display: flex;
  justify-content: flex-start;
}
li:hover {
  background: #f8f8fe;
}
.input-container {
  position: relative;
  max-width: 720px;
  width: 100%;
}
.input-delete {
  position: absolute;
  right: 18px;
  top: 18px;
}

.text-light {
  font-size: 18px;
  font-weight: 100;
  letter-spacing: 0.5px;
}

.text-bold {
  font-size: 40px;
  letter-spacing: 0.8px;
}

.list-item {
  height: 64px;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  border: 1px solid #e2e1e8;
  background-color: #fff;
  cursor: pointer;
  text-align: left;
  justify-content: center;
  border-radius: 12px;
  padding: 15px 50px;
  margin-bottom: 12px;
}
</style>
