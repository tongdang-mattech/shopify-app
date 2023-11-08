<template lang="">
  <div class=" " :style="styleLayout">
    <div class="d-flex flex-column position-relative w-100 h-100">
      <div class="flex-grow-1" :class="props.configMap.layout.mask !== '' ? 'noir' : ''">
        <slot />
      </div>

      <div class="text-container flex-grow-0 py-4 mr-4" style="min-height: 160px">
        <TextHeading :styleText="styleText" :config="configMap" :textColor="textColor" />
        <TextSubHeading :styleText="styleText" :config="configMap" :textColor="textColor" />
        <TextTagLine :styleText="styleText" :config="configMap" :textColor="textColor" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { fontStyles } from '@/utils/sidebarData'
import TextHeading from '../Text/Heading.vue'
import TextTagLine from '../Text/TagLine.vue'
import TextSubHeading from '../Text/SubHeading.vue'
import { colors } from '@/utils/sidebarData'

const styleText = computed(() => {
  let styleText = fontStyles.find((x) => {
    return x.id == props.configMap.text.style
  })
  if (!styleText) return ''
  return styleText.styleText
})

const textColor = computed(() => {
  let textColor = colors.find((x) => {
    return x.id == props.configMap.color
  })
  if (!textColor || props.configMap.layout.mask !== '') return 'dark'
  return textColor.textColor
})

const props = defineProps({
  configMap: { type: Object, default: () => ({ color: 'dark' }) },
  width: {},
  height: {}
})
const styleLayout = computed(() => {
  let temp = {}
  if (props.configMap.layout.padding) {
    temp.padding = '8%'
  }
  return temp
})
</script>
<style scoped>
.text-container {
  position: absolute;
  padding: 5%;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
}
</style>
