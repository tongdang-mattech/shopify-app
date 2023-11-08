<template lang="">
  <div class="tagLine-decorations" :style="styleText.tagLine">
    <span class="text-tagLine" :class="textColor == 'white' ? 'text-white' : ''">
      {{ config.text.tagLine }}
    </span>
  </div>
</template>
<script setup>
defineProps({
  config: { type: Object, default: () => ({}) },
  styleText: { type: Object, default: () => ({}) },
  textColor: { type: String, default: 'dark' }
})
</script>
<style scoped>
@media (min-width: 1280px) and (max-width:1920px) {
  .text-tagLine{
    font-size: 14px;
  }
}
@media (min-width:1921px) {
  .text-tagLine{
    font-size: 36px;
  }
}
.text-tagLine {
  color: rgb(6, 8, 8);
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  font-weight: 300;
  font-style: normal;
  text-transform: capitalize;
}
</style>
