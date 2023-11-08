<template lang="">
  <div class="heading-decorations">
    <span class="text-heading" :style="styleText.heading" :class=" textColor == 'white' ? 'text-white' : ''">
      {{ config.text.heading }}
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
  .text-heading{
    font-size: 24px;
  }
}
@media (min-width:1921px) {
  .text-heading{
    font-size: 48px;
  }
}
.text-heading {
  color: rgb(6, 8, 8);
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  font-weight: 400;
  font-style: normal;
  text-transform: uppercase;
  margin: 0px;
}
</style>
