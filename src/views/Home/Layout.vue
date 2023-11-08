<!-- eslint-disable vue/no-unused-vars -->
<template>
  <v-expansion-panels>
    <v-expansion-panel class="rounded-xl mt-4">
      <v-expansion-panel-title>
        <div class="d-flex align-center py-2">
          <v-btn flat class="icon_title bg-secondary rounded-lg mr-2">
            <IconLayout />
          </v-btn>
          <div>
            <p class="mb-2 font-weight-bold">Layout</p>
            <p class="text-subtitle-2 font-weight-light">
              {{ current_layout.title }} <span v-if="modelValue.mask"> , Mask</span
              ><span v-if="modelValue.padding"> , Margin</span>
            </p>
          </div>
        </div>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <h5>
          <span>Layout Design</span>
          <v-btn flat icon size="x-small">
            <v-icon color="primary" icon="fa-solid fa-circle-info"> </v-icon>
            <v-tooltip max-width="280" activator="parent" location="bottom"
              >These are color schemes used to create style and appeal, and bring an aesthetic
              feeling to your project.</v-tooltip
            >
          </v-btn>
        </h5>
        <v-row class="my-4">
          <v-col
            cols="3"
            v-for="item in layouts"
            :key="item.title"
            class="layout-container"
            :class="{ 'layout-select': modelValue.type === item.type }"
            @click="onSelectLayout(item)"
          >
            <v-img class="img" :src="item.img" cover> </v-img>
            <p class="text-title">{{ item.title }}</p>
          </v-col>
        </v-row>

        <div class="d-flex jusyify-space-between align-center">
          <h5>
            <span> Margin </span>
            <v-btn flat icon size="x-small">
              <v-icon color="primary" icon="fa-solid fa-circle-info"> </v-icon>
              <v-tooltip max-width="280" activator="parent" location="bottom"
                >Adds a border, or margin, to your project, pulling it an inch or so away from the
                edge of the canvas or page.</v-tooltip
              >
            </v-btn>
          </h5>
          <v-spacer></v-spacer>
          <div>
            <v-switch
              color="primary"
              :disabled="!current_layout.can_padding"
              density="comfortable"
              hide-details
              v-model="use_padding"
            >
            </v-switch>
          </div>
        </div>
        <div class="d-flex jusyify-space-between align-center">
          <h5>
            <span> Mask </span>
            <v-btn flat icon size="x-small">
              <v-icon color="primary" icon="fa-solid fa-circle-info"> </v-icon>
              <v-tooltip max-width="280" activator="parent" location="bottom"
                >Adds a top layer to your project, in the form of a cut-out shape of your choosing —
                i.e. stars, circles, butterflies, and more.</v-tooltip
              >
            </v-btn>
          </h5>
          <v-spacer></v-spacer>
          <div>
            <v-switch
              :disabled="!current_layout.mask"
              color="primary" density="comfortable" 
              hide-details v-model="use_mask">
            </v-switch>
          </div>
        </div>
        <template v-if="use_mask">
          <h5 class="mt-2">Mask</h5>
          <v-row class="my-4">
            <v-col
              cols="3"
              v-for="item in masks"
              :key="item.title"
              class="mask-container"
              @click="onSelectMaskType(item)"
              :class="{ 'mask-select': current_type_mask.id === item.id }"
            >
              <v-img class="img" :src="item.img" cover> </v-img>
              <p class="text-title">{{ item.title }}</p>
            </v-col>
          </v-row>
          <div v-if="current_type_mask.maskOptions.length > 1">
            <h5 class="mt-2">Mask Options</h5>
            <v-row class="my-4">
              <v-col
                cols="3"
                v-for="mask in current_type_mask.maskOptions"
                :key="mask.title"
                @click="onSelectMask(mask)"
                class="mask-child-container"
                :class="{ 'mask-child-select': modelValue.mask === mask.id }"
              >
                <v-img class="img" :src="mask.img" cover> </v-img>
                <p class="text-title">{{ mask.title }}</p>
              </v-col>
            </v-row>
          </div>
        </template>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script setup>
import { computed, ref } from 'vue'
import { layouts, masks } from '@/utils/sidebarData'
import IconLayout from '@/components/icon/IconLayout.vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const current_type_mask = ref(null)
const current_mask = ref(null)
onSelectMaskType(masks[0], true)
function onSelectLayout(layout) {
  emit('update:modelValue', {
    ...props.modelValue,
    type: layout.type
  })
}
const use_mask = computed({
  get() {
    return !!props.modelValue.mask
  },
  set(value) {
    if (!value) {
      onSelectMask()
      return
    }
    if (current_mask.value) onSelectMask(current_mask.value)
    else {
      onSelectMaskType(masks[0])
    }
  }
})
const use_padding = computed({
  get() {
    return current_layout.value.can_padding && props.modelValue.padding
  },
  set(value) {
    emit('update:modelValue', {
      ...props.modelValue,
      padding: value
    })
  }
})
function onSelectMaskType(mask, init = false) {
  if (!mask) {
    onSelectMask()
    return
  }
  current_type_mask.value = mask
  onSelectMask(current_type_mask.value.maskOptions[0], init)
}
function onSelectMask(mask, init = false) {
  current_mask.value = mask
  if (init) {
    return
  }
  emit('update:modelValue', {
    ...props.modelValue,
    mask: mask ? mask.id : ''
  })
}
const current_layout = computed(() => {
  if (!props.modelValue || !props.modelValue.type) return ''
  let layout = layouts.find((x) => {
    return x.type == props.modelValue.type
  })

  if (!layout) return ''
  return layout
})
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

<style scoped>
.layout-container,
.mask-container,
.mask-child-container {
  padding: 8px;
  text-align: center;
}
.layout-container .text-title,
.mask-container .text-title,
.mask-child-container .text-title {
  font-weight: bold;
  font-size: 0.75rem;
}
.layout-select .v-img,
.mask-select .v-img,
.mask-child-select .v-img {
  border: solid 2px var(--primary-color) !important;
}
</style>
