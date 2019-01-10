import React from 'react'
import { connect } from 'react-redux'
import L from 'leaflet'
import ExtraMarkers from './extraMarkers'
import { fetchHereReverseGeocode } from '../actions/actions'

const style = {
  width: '100%',
  height: '100vh'
}

const CartoDB_VoyagerLabelsUnder = L.tileLayer(
  'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png',
  {
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19
  }
)

const markersLayer = L.layerGroup()

const mapParams = {
  center: [40.655769, -73.938503],
  zoomControl: false,
  zoom: 13,
  layers: [markersLayer, CartoDB_VoyagerLabelsUnder]
}

class Map extends React.Component {
  componentDidMount() {
    this.map = L.map('map', mapParams)

    L.control
      .zoom({
        position: 'topright'
      })
      .addTo(this.map)

    const brand = L.control({
      position: 'bottomright'
    })
    brand.onAdd = function(map) {
      var div = L.DomUtil.create('div', 'brand')
      div.innerHTML =
        '<a href="https://gis.ops.com" target="_blank"><div class="gis-ops-logo"></div></a>'
      return div
    }
    this.map.addControl(brand)
  }

  componentDidUpdate(prevProps, prevState) {
    const { isochronesMarkers } = this.props

    let cnt = 0

    for (let isochrones of isochronesMarkers) {
      // add marker
      if (isochrones.geocodeResults.length > 0) {
        for (let location of isochrones.geocodeResults) {
          if (location.selected) {
            // if a address is geocoded normally, clear layer beforehand

            if (!isochrones.reverse) this.clearLayerByIndex(cnt)

            if (this.isMarkerPresent(cnt)) {
              this.addIsochronesMarker(location, cnt, true)
            } else {
              this.addIsochronesMarker(location, cnt)
            }
          }
        }
      }

      cnt += 1
    }
  }

  clearLayerByIndex(idx) {
    markersLayer.eachLayer(function(layer) {
      if (layer.options.index === idx) markersLayer.removeLayer(layer)
    })
  }

  isMarkerPresent(idx) {
    let isPresent = false
    markersLayer.eachLayer(function(layer) {
      if (layer.options.index === idx) isPresent = true
    })
    return isPresent
  }

  updatePosition(obj) {
    this.props.dispatch(
      fetchHereReverseGeocode({
        isoIndex: obj.isoIndex,
        ...obj.latLng
      })
    )
  }
  addIsochronesMarker(location, idx, isPresent = false) {
    if (!isPresent) {
      const isochronesMarker = ExtraMarkers.icon({
        icon: 'fa-number',
        markerColor: 'purple',
        shape: 'star',
        prefix: 'fa',
        number: (idx + 1).toString()
      })

      const that = this

      L.marker(location.displayposition, {
        icon: isochronesMarker,
        draggable: true,
        index: idx
      })
        .addTo(markersLayer)
        .bindTooltip(location.title + ', ' + location.description, {
          permanent: false
        })
        .on('dragend', function(e) {
          that.updatePosition({
            latLng: e.target.getLatLng(),
            isoIndex: e.target.options.index
          })
        })
    } else {
      markersLayer.eachLayer(function(layer) {
        if (layer.options.index === idx) {
          layer.setTooltipContent(location.title + ', ' + location.description)
        }
      })
    }
  }

  render() {
    return <div id="map" style={style} />
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state, ownProps)
  const isochronesMarkers = state.isochronesControls.controls
  return {
    isochronesMarkers
  }
}

export default connect(mapStateToProps)(Map)
