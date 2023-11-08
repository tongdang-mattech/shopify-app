<!-- eslint-disable vue/no-unused-vars -->
<template>
  <v-expansion-panels>
    <v-expansion-panel class="rounded-xl mt-4">
      <v-expansion-panel-title v-slot="{ open }">
        <div class="d-flex align-center py-2">
          <v-btn flat class="icon_title bg-secondary rounded-lg mr-2">
            <IconMarker />
          </v-btn>
          <div>
            <p class="mb-2 font-weight-bold">Elements</p>
            <p class="text-subtitle-2 font-weight-light">
              <span v-if="element.marker"> Marker </span>
              <span v-if="element.compass"> Compass </span>
            </p>
          </div>
        </div>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <!-- <div class="d-flex jusyify-space-between align-center">
          <h5>
            <span> Compass </span>
            <v-btn flat icon size="x-small">
              <v-icon color="primary" icon="fa-solid fa-circle-info"> </v-icon>
              <v-tooltip max-width="280" activator="parent" location="bottom"
                >Adds stylized marker to denote the four cardinal directions — or compass directions
                — north, south, east, and west, and to aid in navigation and geographic
                orientation.</v-tooltip
              >
            </v-btn>
          </h5>
          <v-spacer></v-spacer>
          <div>
            <v-switch v-model="element.compass" color="primary" density="comfortable" hide-details>
            </v-switch>
          </div>
        </div> -->
        <div class="d-flex jusyify-space-between align-center">
          <h5>
            <span> Markers </span>
            <v-btn flat icon size="x-small">
              <v-icon color="primary" icon="fa-solid fa-circle-info"> </v-icon>
              <v-tooltip max-width="280" activator="parent" location="bottom"
                >Adds pinpoint map markers to identify one or more specific locations on your map,
                available in several different icon styles.</v-tooltip
              >
            </v-btn>
          </h5>
          <v-spacer></v-spacer>
          <div>
            <v-switch v-model="element.marker" color="primary" density="comfortable" hide-details>
            </v-switch>
          </div>
        </div>
        <v-row v-if="element.marker" class="my-4">
          <v-btn-toggle
            v-model="element.element_marker"
            style="height: fit-content; width: 100%"
            mandatory
          >
            <v-row class="w-100 my-2" no-gutter>
              <v-col
                v-for="item in markers"
                :key="item.title"
                cols="3"
                class="d-flex flex-column align-center flex wrap"
              >
                <v-btn :value="item.id" class="icon_select rounded-lg">
                  <v-img class="img" cover :src="item.thumbnail"></v-img>
                </v-btn>
                <h5 class="text-center mt1">{{ item.title }}</h5>
              </v-col>
            </v-row>
          </v-btn-toggle>
        </v-row>
        <div v-if="element.marker || element.compass">
          <h5>
            <span> Elements Color </span>
            <v-btn flat icon size="x-small">
              <v-icon color="primary" icon="fa-solid fa-circle-info"> </v-icon>
              <v-tooltip max-width="280" activator="parent" location="bottom"
                >The color scheme applied to the various elements of your project, i.e. the compass,
                map markers, route connector, and more.</v-tooltip
              >
            </v-btn>
          </h5>
          <v-row class="my-4">
            <v-btn-toggle
              v-model="element.element_color"
              style="height: fit-content; width: 100%"
              mandatory
            >
              <v-row class="w-100 my-2" no-gutter>
                <v-col
                  v-for="item in elements"
                  :key="item.title"
                  cols="3"
                  class="d-flex flex-column align-center flex wrap"
                >
                  <v-btn :value="item.id" class="icon_select rounded-lg circle">
                    <v-img class="img element-img" cover :src="item.src"></v-img>
                  </v-btn>
                  <h5 class="text-center mt1">{{ item.title }}</h5>
                </v-col>
              </v-row>
            </v-btn-toggle>
          </v-row>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script setup>
import { computed } from 'vue'
import IconMarker from '@/components/icon/IconMarker.vue'
import { markers, elements } from '@/utils/sidebarData'
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const element = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>
<style scoped>
.location-card {
  cursor: pointer;
}

.icon_title {
  font-size: 20px;
  width: 52px;
  height: 52px;
}
.icon_select {
  width: 56px;
  overflow: hidden;
  opacity: 0.8;
  padding: 0;
  position: relative;
  z-index: 10;
}
.circle {
  border-radius: 50% !important;
}
.v-btn--active {
  opacity: 1;
  border: solid 2px var(--primary-color) !important;
}

.element-img {
  border: 2px solid #fefefe;
  border-radius: 50% !important;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transform: rotate(45deg);
}
</style>
