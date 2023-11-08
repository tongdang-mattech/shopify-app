<!-- eslint-disable vue/no-unused-vars -->
<template>
  <v-expansion-panels class="my-4">
    <v-expansion-panel class="material rounded-xl">
      <v-expansion-panel-title v-slot="{ open }">
        <div class="d-flex align-center py-2">
          <v-btn flat class="icon_title bg-secondary rounded-lg mr-2">
            <IconMarterial />
          </v-btn>
          <div>
            <p class="mb-2" style="font-weight: 700">Material</p>
            <p class="desc">  {{ selectMainMatTitle }}
                <span v-if="selectSubMatTitle">, {{ selectSubMatTitle }}</span>
            </p>
            </div>
        </div>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <div class="main_ingre">
          <h5 class="mb-4">
            <span> Orientation </span>
            <v-btn class="btn-infor" flat icon size="x-small">
              <v-icon color="primary" icon="fa-solid fa-circle-info"> </v-icon>
              <v-tooltip max-width="280" activator="parent" location="bottom"
                >The format of your project, typically available in square, landscape (horizontal),
                or portrait (vertical).</v-tooltip
              >
            </v-btn>
            </h5>
            <v-btn-toggle class="group-item" v-model="togleMainMaterial" mandatory>
                <div
                    v-for="item in materials"
                    :key="item.title"
                    class="item-material"
                >
                <v-btn @click="handleSelectMainMaterial(item)" class="icon_select rounded-lg">
                    <v-img cover :src="item.img"></v-img>
                </v-btn>
                <h5 class="title text-center mt-1">{{ item.title }} </h5>
                <p class="price">{{ item.cost }}</p>
                </div>           
            </v-btn-toggle>
        </div>
        <div class="sub_ingre mt-4">
          <h5 class="mb-4">
            <span> Finishes </span>
            <v-btn flat icon size="x-small">
              <v-icon color="primary" icon="fa-solid fa-circle-info"> </v-icon>
              <v-tooltip max-width="280" activator="parent" location="bottom"
                >The format of your project, typically available in square, landscape (horizontal),
                or portrait (vertical).</v-tooltip
              >
            </v-btn>
          </h5>

            <v-btn-toggle v-model="togleSubMaterial" class="group-item" mandatory>
                <div
                    v-for="item in selectMaterial.main.children"
                    :key="item.title"
                    class="item-material"
                >
                <v-btn @click="handleSelectSubMaterial(item)" flat class="icon_select rounded-lg">
                    <v-img cover :src="item.img"></v-img>
                </v-btn>
                <h5 class="title text-center mt-1">{{ item.title }}</h5>
                </div>
            </v-btn-toggle>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script setup>
import { materials } from '@/utils/sidebarData'
import IconMarterial from '@/components/icon/IconMarterial.vue'
import { ref } from 'vue'

const selectMaterial = ref({
    main:materials[0],
    sub:materials[0]?.children[0]
})
const images = ref({src:materials[1].children[0].images[0]})
const togleMainMaterial = ref(0)
const togleSubMaterial = ref(0)

const selectSubMatTitle = ref()
const selectMainMatTitle = ref(materials[0].title)
const emits = defineEmits(['changeMaterial','price'])

const handleSelectMainMaterial = (item)=>{
    selectMaterial.value.main = item
    images.value = item.children[0]
    selectSubMatTitle.value = item.children[0]?.title
    togleSubMaterial.value = 0
    emits('changeMaterial',images)
    emits('price',item.price)
}
const handleSelectSubMaterial = (item)=>{
    images.value = item
    selectSubMatTitle.value = item.title
    emits('changeMaterial',images)

}
</script>
<style scoped>
.group-item {
  height: fit-content;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.title{
    font-size: 12px;
    font-weight: 400;
}
.item-material{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 4px;
    width: 64px;
    align-items: center;
}
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
.price{
    font-size: 9px;
}
</style>
