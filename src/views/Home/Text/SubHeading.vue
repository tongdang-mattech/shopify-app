<template lang="">
  <div class="subheader-decorations" :style="styleText.subHeading" v-if="config.text.subHeading">
    <!-- <div class="separator"></div> -->
    <span class="text-subHeading" :class=" textColor == 'white' ? 'text-white' : ''">
      {{ config.text.subHeading }}
    </span>
    <!-- <div class="separator"></div> -->
  </div>
  <span v-if="split" class="split" :class=" textColor == 'white' ? 'white-split' : ''"></span>
</template>
<script setup>
defineProps({
  config: { type: Object, default: () => ({}) },
  styleText: { type: Object, default: () => ({}) },
  textColor: { type: String, default: 'dark' },
  split: Boolean
})
</script>
<style scoped>
@media (min-width: 1280px) and (max-width:1920px) {
  .text-subHeading{
    font-size: 14px;
  }
}
@media (min-width:1921px) {
  .text-subHeading{
    font-size: 36px;
  }
}
.subheader-decorations {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
}
.text-subHeading {
  color: rgb(6, 8, 8);
  display: flex;
  margin: 4px 0;
  text-align: center;
  align-items: center;
  margin-left: 2.898px;
  margin-right: 2.898px;
  flex-direction: row;
  justify-content: center;
  font-weight: 400;
  font-style: normal;
  text-transform: capitalize;
  font-family: Roboto;
}
.split {
  display: block;
  width: 30%;
  border-top: solid 1px #333;
  padding-bottom: 9.4px;
}
.white-split{
  border-top: solid 1px #fff !important;
}
</style>
