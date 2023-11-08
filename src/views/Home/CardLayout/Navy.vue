<template lang="">
  <div class="d-flex flex-column" :style="styleLayout">
    <div class="flex-grow-1 position-relative" :class="props.configMap.layout.mask !== '' ? 'navy' : ''">
      <slot/>
      <div class="wrapper" :class="props.configMap.layout.mask !== '' ? 'wrapper-mask' : ''">
        <TextHeading :styleText="styleText" :config="configMap" />
        <div class="d-flex flex-row justify-center align-center pb-2">
          <div class="separator"></div>
          <TextSubHeading :styleText="styleText" :config="configMap" />
          <div class="separator"></div>
        </div>
        <TextTagLine :styleText="styleText" :config="configMap" />
      </div>
    </div>
    <div class="flex-grow-0" :class="props.configMap.layout.mask !== '' ? 'navy-block' : ''" > </div>
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
    temp.padding = '6%'
  }
  return temp
})
</script>
<style scoped>
.wrapper {
  position: absolute;
  bottom: 0;
  right: 50%;
  transform: translateX(50%);
  background: white;
  padding: 10px;
}

.separator {
  width: 10.948px;
  height: 0.322px;
  margin-top: 2.415px;
  margin-bottom: 2.415px;
  background-color: rgb(53, 53, 53);
}
</style>
