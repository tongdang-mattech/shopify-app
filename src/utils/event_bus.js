import { reactive } from 'vue'

export const eventBus = reactive({
  showPreviewBox: false
})

export default eventBus

import mitt from 'mitt'
const emitter = mitt()
export { emitter }
