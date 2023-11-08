export function exportMapbox(map) {
  return new Promise((resolve) => {
    map.resize()
    waitMapLoadDone(map).then(() => {
      const canvas = map.getCanvas()
      resolve(canvas.toDataURL())
      map.once('idle', () => {
        const canvas = map.getCanvas()
        resolve(canvas.toDataURL())
      })
    })
  })
}
export function waitMapLoadDone(map) {
  const check = (resolve) => {
    if (map.loaded()) resolve(true)
    else setTimeout(() => check(resolve), 100)
  }

  return new Promise(check)
}
