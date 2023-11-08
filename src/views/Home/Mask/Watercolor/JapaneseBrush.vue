<template>
  <div class="d-flex flex-column align-center position-relative">
    <div class="programmaticLayoutMask">
      <div class="programmaticLayoutMask__square">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<style scoped>
.programmaticLayoutMask {
  position: absolute;
  width: 85%;

  align-items: center;
  display: flex;
  height: 100%;
}
.programmaticLayoutMask {
  mask-image: url('@/assets/masks/japanese_brush.png');
  mask-size: 100%;
  mask-position: center;
  mask-repeat: no-repeat;
  -webkit-mask-image: url('@/assets/masks/japanese_brush.png');
  -webkit-mask-size: 100%;
  -webkit-mask-position: center;
  -webkit-mask-repeat: no-repeat;
}
.programmaticLayoutMask__square {
  aspect-ratio: 1;
  display: flex;
  position: absolute;
  width: 100%;
}
.maskOverlay {
  height: 100%;
  z-index: 999;
  pointer-events: none;
}
</style>
