<template lang="">
  <v-expansion-panels>
    <v-expansion-panel class="rounded-xl mt-4">
      <v-expansion-panel-title>
        <div class="d-flex align-center py-2">
          <v-btn flat class="icon_title bg-secondary rounded-lg mr-2">
            <IconColor />
          </v-btn>
          <div>
            <p class="mb-2 font-weight-bold">Color</p>
            <p class="text-subtitle-2 font-weight-light">
              {{ current_color.title }}
            </p>
          </div>
        </div>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <h5>
          <span>Color Options</span>
          <v-btn flat icon size="x-small">
            <v-icon color="primary" icon="fa-solid fa-circle-info"> </v-icon>
            <v-tooltip max-width="280" activator="parent" location="bottom"
              >These are color schemes used to create style and appeal, and bring an aesthetic
              feeling to your project.</v-tooltip
            >
          </v-btn>
        </h5>
        <v-row class="py-4">
          <v-col
            cols="12"
            sm="12"
            md="6"
            lg="3"
            v-for="color in colors"
            :key="color.title"
            class="color-container"
            :class="{ 'color-select': modelValue === color.id }"
            @click="onSelectColor(color)"
          >
            <v-img class="img" :src="color.src" cover> </v-img>
            <p class="text-title text-truncate text-center" :title="color.title">
              {{ color.title }}
            </p>
          </v-col>
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script setup>
import IconColor from '@/components/icon/IconColor.vue'
import { colors } from '@/utils/sidebarData'
import { computed } from 'vue'
const props = defineProps(['modelValue'])
const current_color = computed(() => {
  let color = colors.find((x) => {
    return x.id == props.modelValue
  })

  if (!color) return ''
  return color
})

const emit = defineEmits(['update:modelValue'])

function onSelectColor(color) {
  emit('update:modelValue', color.id)
}
</script>
<style scoped>
.color-container {
  padding: 8px;
}
.color-select .v-img {
  border: solid 2px var(--primary-color) !important;
}
.color-container .text-title {
  font-weight: bold;
  font-size: 0.75rem;
}
.icon_title {
  font-size: 20px;
  width: 52px;
  height: 52px;
}
</style>
