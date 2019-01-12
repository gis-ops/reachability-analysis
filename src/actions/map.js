export const ZOOM_TO_ISOCHRONES = 'ZOOM_TO_ISOCHRONES'

export const zoomToIsochrones = controlIndex => ({
  type: ZOOM_TO_ISOCHRONES,
  receivedAt: Date.now(),
  controlIndex
})
