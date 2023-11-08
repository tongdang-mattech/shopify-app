<!-- eslint-disable vue/no-unused-vars -->
<template>
  <v-expansion-panels>
    <v-expansion-panel class="rounded-xl mt-4">
      <v-expansion-panel-title v-slot="{ open }">
        <div class="d-flex align-center py-2">
          <v-btn flat class="icon_title bg-secondary rounded-lg mr-2">
            <IconLocation />
          </v-btn>
          <div>
            <p class="mb-2 font-weight-bold">Location</p>
          </div>
        </div>
        <v-spacer></v-spacer>
        <div class="pr-2 text-primary font-weight-bold">
          <span>
            {{ selectedLocations.length }}
          </span>
        </div>
      </v-expansion-panel-title>
      <v-expansion-panel-text class="pt-3">
        <div v-if="selectedLocations.length > 1" class="d-flex jusyify-space-between align-center">
          <h5>
            <span>Connect Locations</span>
            <v-btn flat icon size="x-small">
              <v-icon color="primary" icon="fa-solid fa-circle-info"> </v-icon>
              <v-tooltip max-width="280" activator="parent" location="bottom"
                >Adds a connective line between two or more locations on a street map poster that
                highlights your journey from place to place.</v-tooltip
              >
            </v-btn>
          </h5>
          <v-spacer></v-spacer>
          <div>
            <v-switch
              color="primary"
              density="comfortable"
              hide-details
              v-model="locationData.connected"
              @update:modelValue="emitLocations()"
            >
            </v-switch>
          </div>
        </div>
        <v-card
          class="rounded-lg mb-4 location-card"
          variant="outlined"
          density="comfortable"
          v-for="(item, index) of selectedLocations"
          :key="index"
          @click.stop="updateLocation(item, index)"
        >
          <template v-slot:prepend>
            <v-icon color="primary" icon="fa-solid fa-location-dot"> </v-icon>
          </template>
          <template v-slot:append>
            <v-icon icon="fa-solid fa-xmark" @click.stop="deleteLocation(index)"></v-icon>
          </template>
          <template v-slot:title>
            <p class="text-subtitle-2">{{ item.name }}</p>
          </template>
          <template v-slot:subtitle> {{ item.place_formatted }} </template>
        </v-card>
        <v-card
          class="rounded-lg mb-4 location-card"
          variant="outlined"
          density="comfortable"
          @click="addLocation()"
        >
          <template v-slot:prepend>
            <v-icon color="primary" icon="fa-solid fa-location-dot"> </v-icon>
          </template>
          <template v-slot:title>
            <p class="text-subtitle-1 font-weight-thin">Add another location (optional)</p>
          </template>
        </v-card>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script setup>
import { ref, watch } from 'vue'
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'
import IconLocation from '@/components/icon/IconLocation.vue'
const emit = defineEmits(['update:points', 'click:show-select'])
const appStore = useAppStore()
const { selectedLocations } = storeToRefs(appStore)
//Location
const locationData = ref({
  connected: false
})

const emitLocations = () => {
  emit('update:points', {
    points: selectedLocations.value.map((x) => x.center),
    connected: locationData.value.connected
  })
}
const addLocation = () => {
  emit('click:show-select', { type: 'create' })
}
const updateLocation = (item, index) => {
  emit('click:show-select', { type: 'update', value: item, index })
}
const deleteLocation = (index) => {
  if (selectedLocations.value.length === 1) {
    updateLocation(selectedLocations.value[0])
    return
  }
  selectedLocations.value.splice(index, 1)
  emitLocations()
}
watch(
  selectedLocations,
  () => {
    emitLocations()
  },
  { deep: true, immediate: true }
)
</script>
<style scoped>
.location-card {
  cursor: pointer;
  border: solid 1px rgba(0, 0, 0, 0.1);
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
</style>
