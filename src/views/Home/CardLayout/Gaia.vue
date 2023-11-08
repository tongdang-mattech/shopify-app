<template lang="">
  <div class="d-flex flex-column position-relative" :style="styleLayout">
    <div
      class="flex-grow-1 position-relative pb-4"
      :class="props.configMap.layout.mask !== '' ? 'gaia' : ''"
    >
      <slot />
    </div>
    <div class="text-container flex-grow-0" style="min-height: 100px">
      <TextHeading :styleText="styleText" :config="configMap" />
      <TextSubHeading :styleText="styleText" :config="configMap" />
      <TextTagLine :styleText="styleText" :config="configMap" />
    </div>
  </div>
</template>
<script setup>
import TextHeading from '../Text/Heading.vue'
import TextTagLine from '../Text/TagLine.vue'
import TextSubHeading from '../Text/SubHeading.vue'
import { computed } from 'vue'
import { fontStyles } from '@/utils/sidebarData'
const styleText = computed(() => {
  let styleText = fontStyles.find((x) => {
    return x.id == props.configMap.text.style
  })
  if (!styleText) return ''
  return styleText.styleText
})

const props = defineProps({
  configMap: { type: Object, default: () => ({ color: 'dark' }) },
  width: {},
  height: {}
})
const styleLayout = computed(() => {
  let temp = {}
  if (props.configMap.layout.padding) {
    temp.padding = '58.29px'
  }
  return temp
})
</script>
<style scoped>
.text-container {
  background: linear-gradient(180deg, hsla(0, 0%, 100%, 0), #fff 53.65%);
  pointer-events: none;
}

.border-white {
  border-color: #fff !important;
}
.separator {
  width: 10.948px;
  height: 0.322px;
  margin-top: 2.415px;
  margin-bottom: 2.415px;
  background-color: rgb(53, 53, 53);
}
</style>
