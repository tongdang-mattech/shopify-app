<template>
  <div class="map-control d-flex flex-column">

    <div v-if="!mapControl.lock" class="map-control-btn">
      <div style="position: relative;">
        <v-btn @click="mapControl.bearing=0" color="primary" style="position: absolute; top: -40px;left: -8px;" flat variant="text">
          reset
        </v-btn>
        <v-card style="width:48px;" class="rounded-xl mb-4 py-4 d-flex flex-column align-center">
          <v-slider height="238" color="primary" hide-details v-model="mapControl.bearing" density="compact" direction="vertical" :step="1" :min="-180" :max="180" ></v-slider>
          <p style="font-size: 14px;" class="mt-2">{{ mapControl.bearing }} <span class="deg">°</span></p>
        </v-card>
      </div>
      <div class="wallart__zoom">
        <v-btn color="primary" variant="text" flat icon @click="mapControl.zoom += 0.4">
          <v-icon icon="fa-solid fa-plus" size="small"> </v-icon>
        </v-btn>
        <v-divider thickness="2" color="primary"></v-divider>
        <v-btn color="primary" variant="text" flat icon @click="mapControl.zoom -= 0.4">
          <v-icon icon="fa-solid fa-minus" size="small"> </v-icon>
        </v-btn>
      </div>
      <v-btn class="mt-2" color="primary" icon @click="mapControl.lock = true">
        <v-icon icon="fa-solid fa-lock-open" size="small"> </v-icon>
      </v-btn>
    </div>
    <v-btn v-else color="primary" icon @click="mapControl.lock = false">
      <v-icon icon="fa-solid fa-lock" size="small"> </v-icon>
    </v-btn>
  </div>
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const mapControl = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})
</script>
<style scoped>

.deg {
  display: inline-block;
  margin-left: 0.5px;
}
.map-control {
  position: absolute;
  right: -80px;
  bottom: 0;
}
.wallart__zoom {
  align-items: center;
  background: #fff;
  border-radius: 30px;
  box-shadow: 0 0 20px rgba(6, 5, 32, 0.08);
  height: 98px;
  overflow: hidden;
  position: relative;
}
</style>
