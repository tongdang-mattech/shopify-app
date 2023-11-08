<!-- eslint-disable vue/no-unused-vars -->
<template>
  <NoticeScreenWidth v-if="screenWidth <= 1280" />
  <div v-else class="pa-0">
    <div class="d-flex" style="width: 100%">
      <div style="flex: 1 1 75%;">
        <div
          ref="previewContainer"
          style="width: 100%; height: 100%"
          class="d-flex justify-center align-center flex-fill"
        >
          <div
            style="position: relative"
            :style="[
              configMap.direction == 'height' ? 'height: 80%;' : 'width: 80%;',
              { 'aspect-ratio': ratio }
            ]"
            :class="[
              (configMap.ratio > 1 && configMap.ratio <1.5 )? 'landscape1 landscape pad' : '',
              configMap.ratio >= 1.5 ? 'landscape2 landscape pad' : '',
              configMap.ratio == 1 ? 'square pad' : ''
            ]"
          >
            <img class="pen" src="/images/pen.png" alt="" />
  
            <div class="wallart-layout" style="width: 100%; height: 100%" ref="image">
              <img
                :src="configMap.material.path"
                v-if="configMap.material.path"
                class="wallartEditor-frame"
              />
              <MapView ref="mapViewRef" :config-map="configMap" />
            </div>
            <MapControl v-model="configMap.map_control" />
          </div>
        </div>
      </div>
      <div style="flex: 1 1 25%;">
        <div class="sidebar d-flex flex-column">
          <div class="flex-grow-1 overflow-y-auto pa-4">
            <Location
              v-model="configMap.location"
              @update:points="onUpdateLocations"
              @click:show-select="onShowSelectPoint"
            />
  
            <!-- Color -->
            <ConfigColor v-model="configMap.color" />
  
            <!-- Text -->
            <Text v-model="configMap.text" @click:reset="handleResetText" />
  
            <!-- Elements -->
            <Elements v-model="configMap.element" />
  
            <!-- Layout -->
            <Layout v-model="configMap.layout" />
  
            <!-- Format -->
            <Format @changeFomat="handleChangeFormat" @price="getFormatPrice" />
  
            <!-- Marterial -->
            <Material @changeMaterial="handleChangeMaterial" @price="getMaterialPrice" />
          </div>
          <div class="flex-grow-0 pa-4 d-flex">
            <div class="d-flex align-center">
              <h3 class="price-wrapper__main">{{ total }}</h3>
              <span v-if="discount" class="price-wrapper__sub">{{ totalNoDiscount }}</span>
              <span v-if="discount" class="price-wrapper__discount">{{ discount * 100 }}% </span>
            </div>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              variant="flat"
              size="large"
              rounded="xl"
              class="text-none"
              prepend-icon="fa-shopping-cart"
              @click="onGetImage()"
            >
              Add To Cart
            </v-btn>
          </div>
        </div>
      </div>
    </div>
    <Preview
      @closePrevew="onClosePreview()"
      v-model="eventBus.showPreviewBox"
      :config-map="configMap"
    >
      <div v-if="imagePreview.loading">
        <div class="fa-3x">
          <i class="fas fa-circle-notch fa-spin"></i>
        </div>
      </div>
      <template v-else>
        <div
          div
          v-if="eventBus.showPreviewBox"
          class="position-relative"

          :style="[
            configMap.direction == 'height' ? 'height: 80%;' : 'width: 80%;',
            { 'aspect-ratio': configMap.ratio }
          ]"
          :class="[
            (configMap.ratio > 1 && configMap.ratio <1.5 )? 'landscape1 landscape pad' : '',
            configMap.ratio >= 1.5 ? 'landscape2 landscape pad' : '',
            configMap.ratio == 1 ? 'square pad' : ''
          ]"
        >
          <div class="wallart-layout" style="width: 100%; height: 100%" ref="exportImageRef">
            <img
              :src="configMap.material.path"
              v-if="configMap.material.path"
              class="wallartEditor-frame"
            />
            <ImageView :config-map="configMap" />

          </div>
        </div>
      </template>
    </Preview>
    <LocationSelectDialog ref="LocationSelectDialogRef" />
  </div>
</template>
<script setup>
import { ref, watch, reactive, onMounted, watchEffect, nextTick } from 'vue'
import Preview from '../components/Preview.vue'
import { eventBus } from '@/utils/event_bus'
import MapView from './Home/View/MapView.vue'
import ImageView from './Home/View/ImageView.vue'
import Format from './Home/Format.vue'
import Material from './Home/Material.vue'
import Location from './Home/Config/Location.vue'
import Text from './Home/Config/Text.vue'
import Elements from './Home/Elements.vue'
import Layout from './Home/Layout.vue'
import ConfigColor from './Home/Config/Color.vue'
import { convertCoordinates } from '@/utils/convertCoordinates'
import LocationSelectDialog from './Home/Config/LocationSelectDialog.vue'
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'
import MapControl from './Home/MapControl.vue'
import NoticeScreenWidth from './Home/NoticeScreenWidth.vue'
import { emitter } from '../utils/event_bus'
import calculatePrice from '../utils/price'
import {discount} from '../utils/constant'
import { formats } from '@/utils/sidebarData'

const exportImageRef = ref(null)
const imagePreview = reactive({ loading: false, image: null })

const appStore = useAppStore()
const { selectedLocations } = storeToRefs(appStore)
const showPreviewBox = ref(false)

const screenWidth = ref(window.innerWidth)
const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth
}

const ratio = ref(1)
const material = ref()
const previewContainer = ref(null)
const direction = ref('width')

const mapViewRef = ref(null)
const LocationSelectDialogRef = ref(null)

// tính giá tiền
const currentPrice = Number(formats[0].children[0].price)
const totalNoDiscount = ref(currentPrice)
const total = ref((currentPrice - (currentPrice * discount)).toFixed(2))
const price = ref({ format: currentPrice, material: 0 })
const getMaterialPrice = (value) => {
  price.value.material = value
  total.value = calculatePrice(price.value, discount)
  totalNoDiscount.value = (total.value/0.8).toFixed(2)

}
const getFormatPrice = (value) => {
  price.value.format = value
  total.value = calculatePrice(price.value, discount)
  totalNoDiscount.value = (total.value/0.8).toFixed(2)
}
//  giá trị config map
const configMap = reactive({
  format: '',
  color: 'dark',
  text: {
    heading: '',
    subHeading: '',
    tagLine: '',
    style: 'classic1'
  },
  points: [],
  point_connected: false,
  element: {
    compass: false,
    marker: true,
    element_marker: 'dot',
    element_color: 'black_white'
  },
  layout: {
    type: 'PantomineCardLayout',
    mask: '',
    padding: false
  },
  map_control: {
    bearing: 0,
    zoom: 5,
    lock: false
  },
  direction: 'width',
  ratio: 1,
  material: {
    path: ''
  },
  image: null
})
onMounted(() => {
  const r = 18 / 24
  setDirection(r)
  updateScreenWidth()
  window.addEventListener('resize', updateScreenWidth)
})

const setMaterialPath = (path) => {
  configMap.material.path = path
}
function setDirection(r) {
  const width = previewContainer.value.clientWidth
  const height = previewContainer.value.clientHeight
  const wayOneHeight = width / r
  if (wayOneHeight > height) {
    direction.value = 'height'
  } else {
    direction.value = 'width'
  }
  ratio.value = r
  configMap.ratio = r
  configMap.direction = direction.value
}

const handleChangeFormat = (value) => {
  const size = value
  const r = size[0] / size[1]
  setDirection(r)
  nextTick(() => {
    mapViewRef.value.resize()
  })
  if (configMap.material.path) {
    setMaterialPath(material.value.images.find((x) => x.ratio == configMap.ratio).imgPath)
  }
}

const handleChangeMaterial = (value) => {
  material.value = value._rawValue
  let imagePath = ''
  if (material.value) {
    imagePath = material.value.images.find((x) => x.ratio == ratio.value).imgPath
  }
  setMaterialPath(imagePath)
}

const handleResetText = () => {
  if (selectedLocations.value.length > 0) {
    configMap.text.heading = selectedLocations.value[0].name
    configMap.text.subHeading = selectedLocations.value[0].context.country.name
    configMap.text.tagLine = convertCoordinates(selectedLocations.value[0].center)
  }
}

watch(
  () => eventBus.showPreviewBox,
  (newValue) => {
    showPreviewBox.value = newValue
  }
)
//
watchEffect(() => {
  if (selectedLocations.value.length > 0) {
    configMap.text.heading = selectedLocations.value[0].name
    configMap.text.subHeading = selectedLocations.value[0].context.country.name
    configMap.text.tagLine = convertCoordinates(selectedLocations.value[0].center)
  }
})

function onUpdateLocations(value) {
  configMap.points = value.points
  configMap.point_connected = value.connected
}
function onShowSelectPoint(item) {
  LocationSelectDialogRef.value.open(item)
}
function onGetImage() {
  mapViewRef.value.toImage().then((res) => {
    console.log(res)
  })
}
emitter.on('open-preview', async function () {
  imagePreview.loading = true
  imagePreview.image = null
  configMap.image = null
  try {
    let image_map = await mapViewRef.value.toImage()
    configMap.image = image_map
    await nextTick()
  } finally {
    imagePreview.loading = false
  }
})
function onClosePreview() {
  eventBus.showPreviewBox = false
  configMap.image = null
}
</script>
<style>

</style>
<style scoped>
.add_card {
  height: 86px;
  padding: 8px 16px;
}
.pen {
  position: absolute;
  bottom: 0;
  left: -40px;
  max-height: 232px;
}
.v-bottom-navigation__content {
  justify-content: space-between !important;
}
.sidebar {
  height: calc(100vh - var(--header-height));
  border-left: 1px solid #bdbbbb;
  width: 100%;
  overflow-y: overlay;
}

.location-card {
  cursor: pointer;
}

.icon_title {
  font-size: 20px;
  width: 52px;
  height: 52px;
}
.icon_select {
  width: 56px;
  height: 64px !important;
  overflow: hidden;
  opacity: 0.5;
  padding: 0;
  position: relative;
  z-index: 10;
}
.v-btn--active {
  opacity: 1;
  border: solid 2px var(--primary-color) !important;
}
.price-wrapper__main {
  color: #171717;
  font-family: 'Gilroy';
  font-size: 18px;
  font-weight: 600;
  margin-right: 6px;
}
.price-wrapper__sub {
  color: #838290;
  font-family: 'Gilroy';
  font-size: 12px;
  font-weight: 400;
  text-decoration-line: line-through;
}
.price-wrapper__discount {
  background: #fc124a;
  border-radius: 6px;
  color: #fff;
  color: #f2f2f2;
  font-family: 'Gilroy';
  font-size: 11px;
  font-weight: 600;
  margin-left: 7px;
  opacity: 0.6;
  padding: 0 5px;
}
.footer {
  position: absolute;
  height: 86px;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #fff;
  z-index: 99;
}
.wallart-layout {
  background: #fff;
  box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.44);
  display: flex;
  margin: 0;
  position: relative;
  transform-origin: 0 0;
}
.wallartEditor-frame {
  pointer-events: none;
  position: absolute;
  transform: scale(1.2);
  width: 100%;
  z-index: 20;
}
</style>
