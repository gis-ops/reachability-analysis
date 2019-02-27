export const ZOOM_TO_ISOCHRONES = 'ZOOM_TO_ISOCHRONES'
export const ZOOM_TO_POINT = 'ZOOM_TO_POINT'
export const TOGGLE_ISOCHRONES = 'TOGGLE_ISOCHRONES'
export const DOWNLOAD_ISOCHRONES = 'DOWNLOAD_ISOCHRONES'

export const zoomToIsochrones = controlIndex => ({
  type: ZOOM_TO_ISOCHRONES,
  receivedAt: Date.now(),
  controlIndex
})

export const toggleIsochrones = controlIndex => ({
  type: TOGGLE_ISOCHRONES,
  receivedAt: Date.now(),
  controlIndex
})

export const zoomToPoint = latLng => ({
  type: ZOOM_TO_POINT,
  receivedAt: Date.now(),
  latLng
})

export const downloadIsochrones = controlIndex => ({
  type: DOWNLOAD_ISOCHRONES,
  receivedAt: Date.now(),
  controlIndex
})
