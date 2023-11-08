<template lang="">
  <div class="d-flex flex-column position-relative" :style="styleLayout">
    <div class="text-container flex-grow-0" style="min-height: 80px" >
      <div class="wrapper">
        <TextHeading :styleText="styleText" :config="configMap" />
        <div class="py-2">
          <TextSubHeading :styleText="styleText" :config="configMap" />
          <TextTagLine :styleText="styleText" :config="configMap" />
        </div>
      </div>
    </div>
    <div class="flex-grow-1" :class="props.configMap.layout.mask !== '' ? 'newspaper ' : ''">
      <slot />
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { fontStyles } from '@/utils/sidebarData'
import TextHeading from '../Text/Heading.vue'
import TextTagLine from '../Text/TagLine.vue'
import TextSubHeading from '../Text/SubHeading.vue'

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
    temp.padding = '0 8% 8% 8%'
  }
  return temp
})
</script>
<style scoped>
.text-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5% 7%;
  padding-bottom: 0;
}
.wrapper{
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.text-heading {
  font-size: 21px;
}
</style>
