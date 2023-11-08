<template>
  <v-dialog style="background: #4e4e4ea8;" fullscreen persistent>
    <div class="d-flex flex-column full-height full-width">
      <div class="flex-grow-0 d-flex align-center pa-4 text-white text-h4">
        <v-spacer></v-spacer>
        <v-btn @click="$emit('closePrevew')" variant="text" icon size="large">
          <v-icon size="large"> fa-solid fa-xmark</v-icon>
        </v-btn>
      </div>
      <div class="flex-grow-1">
        <div class="d-flex align-center justify-center h-100">
            <slot />
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  configMap: { type: Object, default: () => ({ color: 'dark' }) }
})
</script>
