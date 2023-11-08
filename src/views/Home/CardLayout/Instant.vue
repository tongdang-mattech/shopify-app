<template lang="">
  <div class="d-flex flex-column position-relative" :style="styleLayout">
    <div class="flex-grow-1 position-relative " :class="props.configMap.layout.mask !== '' ? 'instant' : ''">
      <slot />
    </div>
    <div class="text-container">
      <div class="wrapper">
        <TextHeading :styleText="styleText" :config="configMap" />
        <div>
          <TextSubHeading :styleText="styleText" :config="configMap" />
          <TextTagLine :styleText="styleText" :config="configMap" />
        </div>
      </div>
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
    temp.padding = '8%'
  }
  return temp
})
</script>
<style scoped>
.text-container {
  border-top: 2.55px solid rgb(123, 123, 123);
  background-color: rgb(255, 255, 255);
  flex-direction: column;
  align-items: center;
  justify-content: end;
}
.wrapper{
  padding: 5% 7%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
