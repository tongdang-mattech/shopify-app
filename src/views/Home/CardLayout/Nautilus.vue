<template lang="">
  <div class="d-flex flex-column position-relative">
    <div class="block-border">
      <div
        class="map-box-container flex-grow-1"
        :class="props.configMap.layout.mask !== '' ? 'nautilus' : ''"
      >
        <slot />
      </div>

      <div
        class="text-container"
        :class="props.configMap.layout.mask !== '' ? 'nautilus-text' : ''"
      >
        <div class="wrapper">
          <TextHeading :styleText="styleText" :config="configMap" :textColor="'dark'" />
          <TextSubHeading
            :styleText="styleText"
            :config="configMap"
            :textColor="'dark'"
            :split="true"
          />
          <TextTagLine :styleText="styleText" :config="configMap" :textColor="'dark'" />
        </div>
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
</script>
<style scoped>
.map-box-container {
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
}
.block-border {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  align-self: stretch;
  margin: 8%;
  padding: 2%;
  border-style: solid;
  border-color: rgb(58, 58, 58);
  border-width: 3.04px;
  position: relative;
}
.text-container {
  flex-direction: column;
  align-items: center;
  justify-content: end;
  width: 100%;
}
.wrapper {
  padding: 5% 0 2%0% 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.border-white {
  border-color: #fff !important;
}
</style>
