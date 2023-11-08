<template lang="">
  <div class="d-flex flex-column position-relative">
    <div class="flex-grow-1" :class="props.configMap.layout.mask !== '' ? 'framed px-8' : ''">
      <slot />
    </div>
    <div class="block">
      <div class="text-block" :class="textColor == 'white' ? 'border-white' : ''">
        <div>
          <TextHeading :styleText="styleText" :config="configMap" :textColor="textColor" />
          <v-spacer />
        </div>
        <div>
          <TextSubHeading :styleText="styleText" :config="configMap" :textColor="textColor" />
          <TextTagLine :styleText="styleText" :config="configMap" :textColor="textColor" />
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
</script>
<style scoped>
.map-wrap {
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-self: stretch;
  position: relative;
  background-color: rgb(255, 250, 247);
}
.block {
  display: flex;
  z-index: 99;
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 43.05px;
  pointer-events: none;
}
.text-block {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  border-style: solid;
  border-width: 2.1525px;
  border-color: rgb(208, 124, 101);
  align-items: center;
  flex-grow: 1;
  pointer-events: none;
  z-index: 5;
  padding: 2% 0;
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
