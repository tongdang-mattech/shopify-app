<script setup>
import { computed } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import { useAppStore } from '@/store/app'
import { eventBus } from '@/utils/event_bus'
import { emitter } from '@/utils/event_bus'

const menus = [
  { title: 'Location', name: 'pickLocation' },
  { title: 'Configuration', name: 'home' }
]
const route = useRoute()
const router = useRouter()
const appStore = useAppStore()

const canNextStep = computed(() => {
  return appStore.nextStepAble[route.name]
})

function goNextStep() {
  const step = appStore.getNextStep(route.name)
  if (step != null) {
    router.push({ name: step })
  }
}
function openPreview() {
  eventBus.showPreviewBox = true
  emitter.emit('open-preview')
}
</script>

<template>
  <div>
    <div class="header d-flex align-center justify-space-between">
      <div class="d-flex align-center logo">
        <v-btn variant="text" icon :to="{ name: 'pickLocation' }">
          <v-icon icon="fa-solid fa-xmark"></v-icon>
        </v-btn>
        <v-divider class="ml-6 mx-8" vertical></v-divider>
        <div class="d-flex align-center">
          <v-img src="/images/logo.jpg" style="width: 34px; height: 34px"></v-img>
          <p style="margin: 0 10px; font-size: 20px; font-weight: 700; letter-spacing: 3px">
            Printelly
          </p>
        </div>
      </div>
      <div v-if="route.meta.menu" class="nav d-flex align-center">
        <div
          flat
          v-for="menu of menus"
          :key="menu.name"
          class="menu-item"
          :class="{ 'menu-item-active': route.name == menu.name }"
        >
          {{ menu.title }}
        </div>
      </div>
      <div class="d-flex align-center help">
        <v-btn
          prepend-icon="fa-regular fa-circle-question"
          size="x-large"
          variant="outlined"
          flat
          style="color: var(--primary-color); text-transform: capitalize; margin-right: 12px"
          class="ml-4 rounded-xl"
        >
          <template v-slot:prepend>
            <v-icon color="primary"></v-icon>
          </template>

          Help
        </v-btn>
        <v-btn
          v-if="route.meta.preview"
          prepend-icon="fa-regular fa-eye"
          size="x-large"
          variant="outlined"
          class="rounded-xl"
          flat
          style="color: var(--primary-color); text-transform: capitalize; margin-left: 12px"
          @click="openPreview()"
        >
          <template v-slot:prepend>
            <v-icon color="primary"></v-icon>
          </template>

          Preview
        </v-btn>
      </div>
    </div>

    <div class="content-container">
      <RouterView :key="$route.fullPath" />
    </div>

    <div v-if="route.meta.footer" class="footer">
      <v-btn
        class="back"
        style="
          color: var(--primary-color);
          font-weight: 700;
          font-size: 18px;
          text-transform: capitalize;
        "
        flat
        prepend-icon="fa-solid fa-arrow-left"
        >Back</v-btn
      >
      <v-btn
        class="next rounded-xl px-8"
        style="font-weight: 700; font-size: 18px; text-transform: capitalize; padding: 8px"
        size="x-large"
        flat
        append-icon="fa-solid fa-arrow-right"
        :disabled="!canNextStep"
        color="primary"
        @click="goNextStep"
      >
        Next step
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.header {
  padding: 20px 30px;
  border-bottom: 1px solid #c0ceca;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  padding: 0 28px;
  height: var(--header-height);
  z-index: 999;
  background: white;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
}
.content-container {
  height: 100vh;
  /* background: #f8f8fe; */
  background-color: #f6f5fa;
  padding-top: calc(var(--header-height));
}

.menu-item {
  font-size: 14px;
  font-weight: 600;
  color: #838290;
  padding-left: 15px;
  padding-right: 15px;
  letter-spacing: 0.01em;
}

.menu-item-active {
  color: #171717 !important;
}
.footer {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  bottom: 0;
  right: 0;
  left: 0;
  height: var(--footer-height);
  background: #fff;
  z-index: 999;
  padding: 8px 20px;
}
</style>
