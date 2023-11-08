<template lang="">
    <div class=" d-flex flex-column position-relative">
        <div class="block-border"  >
            <div class="map-box-container flex-grow-1" :class="props.configMap.layout.mask !== '' ? 'nautical' : ''">
            <slot />
            </div>
    
          </div>
          <div class="text-container">
            <div class="wrapper">
              <div class="box">
                <TextHeading :styleText="styleText" :config="configMap" :textColor="'white'" />
                <TextSubHeading :styleText="styleText" :config="configMap" :textColor="'white'" />
                <TextTagLine :styleText="styleText" :config="configMap" :textColor="'white'" />
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
.map-box-container{
    flex-grow: 1;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
}
.block-border{
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: center;
    align-self: stretch;
    margin: 35.264px;
    padding: 6.08px;
    position: relative;
}
.text-container{
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
    bottom: 0;
    right: 0;
    top: 0;
    left: 0;
}
.wrapper{
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
}
.box{
  padding-top: 5% 2%;
  width: calc(20vw - 8vh);
  background: #000;
}
.split{
    display: block;
    width: 50%;
    border-top: solid 1px #333;
    padding-bottom: 9.4px;
}
.border-white {
  border-color: #fff !important;
}
</style>
