export const ZOOM_TO_ISOCHRONES = 'ZOOM_TO_ISOCHRONES'
export const ZOOM_TO_POINT = 'ZOOM_TO_POINT'

export const zoomToIsochrones = controlIndex => ({
  type: ZOOM_TO_ISOCHRONES,
  receivedAt: Date.now(),
  controlIndex
})

export const zoomToPoint = latLng => ({
  type: ZOOM_TO_POINT,
  receivedAt: Date.now(),
  latLng
})
