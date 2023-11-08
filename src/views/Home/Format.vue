<!-- eslint-disable vue/no-unused-vars -->
<template>
  <v-expansion-panels class="my-4">
    <v-expansion-panel class="format rounded-xl">
      <v-expansion-panel-title v-slot="{ open }">
        <div class="d-flex align-center py-2">
          <v-btn flat class="icon_title bg-secondary rounded-lg mr-2">
            <IconFormat />
          </v-btn>
          <div>
            <p class="mb-2" style="font-weight: 700">Format</p>
            <p class="desc">{{ formatSelectData.main }} {{ formatSelectData.sub }}</p>
          </div>
        </div>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <div class="main_ingre">
          <p class="mb-4">
            <span> Orientation </span>
            <v-btn flat icon size="x-small">
              <v-icon color="primary" icon="fa-solid fa-circle-info"> </v-icon>
              <v-tooltip max-width="280" activator="parent" location="bottom"
                >The relative dimensions of your product or project, measured in width x height.
                *Please note that specific size availability may depend on products and materials
                chosen.</v-tooltip
              >
            </v-btn>
          </p>

          <v-btn-toggle v-model="togleMainFormat" style="height: 100px; width: 100%" mandatory>
            <div
              v-for="item in formats"
              :key="item.title"
              class="d-flex flex-column align-center flex wrap"
            >
              <v-btn @click="handleChangeFormat(item)" class="icon_select rounded-lg mx-2">
                <v-img cover :src="item.img"></v-img>
              </v-btn>
              <h5 class="text-center mt-1">{{ item.title }}</h5>
            </div>
          </v-btn-toggle>
        </div>
        <div class="sub_ingre mt-4">
          <p>
            <span> Size </span>
            <v-btn flat icon size="x-small">
              <v-icon color="primary" icon="fa-solid fa-circle-info"> </v-icon>
              <v-tooltip max-width="280" activator="parent" location="bottom"
                >The relative dimensions of your product or project, measured in width x height.
                *Please note that specific size availability may depend on products and materials
                chosen.</v-tooltip
              >
            </v-btn>
          </p>
          <v-btn-toggle v-model="togleSubFormat" style="height: fit-content; width: 100%" mandatory>
            <div
              v-for="item in selectFomat.children"
              :key="item.title"
              class="d-flex flex-column align-center"
            >
              <v-btn @click="handleGetSubData(item)" flat class="icon_select rounded-lg">
                <v-img cover :src="item.img"></v-img>
              </v-btn>
              <h5 class="text-center mt-1">{{ item.value }}</h5>
            </div>
          </v-btn-toggle>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script setup>
import { formats } from '@/utils/sidebarData'
import IconFormat from '@/components/icon/IconFormat.vue'
import { ref } from 'vue'

//  lấy dữ liệu format
const formatSelectData = ref({ main: formats[0].title, sub: formats[0].children[0].value })
const togleSubFormat = ref(0)
const togleMainFormat = ref(0)
const selectFomat = ref(formats[0])

const emits = defineEmits(['changeFomat','price'])
const handleChangeFormat = (item) => {
    selectFomat.value = item
    formatSelectData.value.main = item.title
    togleSubFormat.value = 0
    formatSelectData.value.sub = item.children[0].value
    emits('changeFomat',item.children[0].wh)
    emits('price',item.children[0].price)
}
const handleGetSubData = (item)=>{
    emits('changeFomat', item.wh)
    emits('price',item.price)
}
</script>
<style scoped>
.icon_title {
  font-size: 20px;
  width: 52px;
  height: 52px;
}
.icon_select {
  width: 56px;
  height: 64px !important;
  overflow: hidden;
  opacity: 0.5;
  padding: 0;
  position: relative;
  z-index: 10;
}
.v-btn--active {
  opacity: 1;
  border: solid 2px var(--primary-color) !important;
}
</style>
