<!-- eslint-disable vue/no-unused-vars -->
<template>
  <v-expansion-panels>
    <v-expansion-panel class="rounded-xl mt-4">
      <v-expansion-panel-title v-slot="{ open }">
        <div class="d-flex align-center py-2">
          <v-btn flat class="icon_title bg-secondary rounded-lg mr-2">
            <IconText />
          </v-btn>
          <div>
            <p class="mb-2 font-weight-bold">Text</p>
            <p class="text-subtitle-2 font-weight-light">{{ current_font }}</p>
          </div>
        </div>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-tabs v-model="tab" color="primary" align-tabs="center">
          <v-tab :value="1" class="text-capitalize">Text</v-tab>
          <v-tab :value="2" class="text-capitalize">Font Style</v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item :value="1">
            <v-form class="my-4">
              <v-text-field
                label="Heading"
                variant="outlined"
                placeholder="Enter your heading"
                v-model="form.heading"
              >
              </v-text-field>
              <v-text-field
                label="Subheading"
                variant="outlined"
                placeholder="Enter your subheading"
                v-model="form.subHeading"
              >
              </v-text-field>
              <v-text-field
                label="Tagline"
                variant="outlined"
                placeholder="Enter your tagline"
                v-model="form.tagLine"
              >
              </v-text-field>
              <div class="d-flex justify-end">
                <v-btn flat class="text-capitalize" @click="resetText()"> Reset To Default </v-btn>
              </div>
            </v-form>
          </v-window-item>
          <v-window-item :value="2">
            <v-btn-toggle style="height: fit-content; width: 100%" mandatory v-model="form.style">
              <v-row class="w-100 my-2" no-gutter>
                <v-col
                  v-for="item in fontStyles"
                  :key="item.id"
                  cols="3"
                  class="d-flex flex-column align-center flex wrap"
                >
                  <v-btn :value="item.id" class="icon_select rounded-lg">
                    <v-img class="img" cover :src="item.src"></v-img>
                  </v-btn>
                  <h5 class="text-center mt1">{{ item.title }}</h5>
                </v-col>
              </v-row>
            </v-btn-toggle>
          </v-window-item>
        </v-window>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script setup>
import { ref, computed } from 'vue'
import { fontStyles } from '@/utils/sidebarData'
import IconText from '@/components/icon/IconText.vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue', 'click:reset'])

const current_font = computed(() => {
  let font = fontStyles.find((x) => {
    return x.id == props.modelValue.style
  })
  if (!font) return ''
  return font.title
})

const form = computed({
  // getter
  get() {
    return props.modelValue
  },
  // setter
  set(newValue) {
    emit('update:modelValue', newValue)
  }
})

const resetText = () => {
  emit('click:reset')
}

const tab = ref(null)
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
