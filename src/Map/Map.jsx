import React from 'react'
import { connect } from 'react-redux'
import L from 'leaflet'
import chroma from 'chroma-js'
import ExtraMarkers from './extraMarkers'
import HereTileLayer from './hereTileLayer'
import {
  fetchHereReverseGeocode,
  hideIsochronesIndex
} from '../actions/actions'
import PropTypes from 'prop-types'
import { saveAs } from 'file-saver'

const style = {
  width: '100%',
  height: '100vh'
}

// const CartoDB_VoyagerLabelsUnder = L.tileLayer(
//   'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png',
//   {
//     attribution:
//       '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
//     subdomains: 'abcd',
//     maxZoom: 19
//   }
// )

const hereReducedDay = HereTileLayer.here({
  appId: 'jKco7gLGf0WWlvS5n2fl',
  appCode: 'HQnCztY23zh2xiTPCFiTMA',
  scheme: 'reduced.day'
})

const hereHybridGreyDay = HereTileLayer.here({
  appId: 'jKco7gLGf0WWlvS5n2fl',
  appCode: 'HQnCztY23zh2xiTPCFiTMA',
  scheme: 'hybrid.grey.day'
})

const hereTruck = HereTileLayer.here({
  appId: 'jKco7gLGf0WWlvS5n2fl',
  appCode: 'HQnCztY23zh2xiTPCFiTMA',
  scheme: 'normal.day',
  resource2: 'trucktile'
})

const markersLayer = L.layerGroup()

const isochronesLayer = L.layerGroup()

const southWest = L.latLng(-90, -180),
  northEast = L.latLng(90, 180),
  bounds = L.latLngBounds(southWest, northEast)

const mapParams = {
  center: [25.95681, -35.729687],
  zoomControl: false,
  maxBounds: bounds,
  zoom: 2,
  layers: [markersLayer, isochronesLayer, hereReducedDay]
}

class Map extends React.Component {
  static propTypes = {
    isochronesControls: PropTypes.array.isRequired,
    mapEvents: PropTypes.object,
    hereConfig: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  }
  componentDidMount() {
    this.map = L.map('map', mapParams)

    var isochronesPane = this.map.createPane('isochronesPane')

    isochronesPane.style.opacity = 0.9

    const baseMaps = {
      'HERE reduced.day': hereReducedDay,
      'HERE hybrid.grey.day': hereHybridGreyDay,
      'HERE fleet': hereTruck
    }

    L.control.layers(baseMaps).addTo(this.map)

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
    const hereLogo = L.control({
      position: 'bottomright'
    })

    hereLogo.onAdd = function(map) {
      var div = L.DomUtil.create('div', 'brand')
      div.innerHTML =
        '<a href="https://developer.here.com/" target="_blank"><div class="here-logo"></div></a>'
      return div
    }
    this.map.addControl(brand)
    this.map.addControl(hereLogo)
  }

  updateMarkers() {
    const { isochronesControls } = this.props

    //markersLayer.clearLayers()

    let cnt = 0
    for (let isochrones of isochronesControls) {
      // add marker
      if (isochrones.geocodeResults.length > 0) {
        for (let location of isochrones.geocodeResults) {
          if (location.selected) {
            // if a address is geocoded normally, clear layer beforehand
            if (!isochrones.reverse) this.clearLayerByIndex(cnt)
            this.addIsochronesMarker(location, cnt, this.isMarkerPresent(cnt))
          }
        }
      }

      cnt += 1
    }
  }

  getTooltipContent(settings, isochrone) {
    let travelIcon = 'car'
    if (settings.mode == 'car') {
      travelIcon = 'car'
    } else if (settings.mode == 'truck') {
      travelIcon = 'truck'
    } else if (settings.mode == 'pedestrian') {
      travelIcon = 'male'
    }

    let rangeTypeIcon = 'arrows alternate horizontal'
    if (settings.rangetype == 'time') rangeTypeIcon = 'clock'

    return {
      html: `<div class="ui list">
        <div class="item">
          <i class="${travelIcon} icon"></i>
          <div class="content">
            ${settings.mode}
          </div>
        </div>
        <div class="item">
          <i class="${rangeTypeIcon} icon"></i>
          <div class="content">
            ${
              settings.rangetype === 'time'
                ? isochrone.range / 60 + ' minutes'
                : isochrone.range / 1000 + ' kilometers'
            }
          </div>
        </div>
      </div>`,
      settings: {
        mode: settings.mode,
        range:
          settings.rangetype == 'time'
            ? isochrone.range / 60 + ' minutes'
            : isochrone.range / 1000 + ' kilometers'
      }
    }
  }

  updateIsochrones(prevProps) {
    const { isochronesControls } = this.props

    isochronesLayer.clearLayers()

    for (let i = 0; i < isochronesControls.length; i++) {
      if (
        isochronesControls[i].isochrones.results.length > 0 &&
        isochronesControls[i].isochronesHidden == false
        //&& isochronesControls[i].isochrones.receivedAt > prevIsochronesControls[i].isochrones.receivedAt
      ) {
        let cnt = 0
        const isochroneResultsReversed =
          isochronesControls[i].isochrones.results
        const scaleHsl = chroma
          .scale(['#f44242', '#f4be41', '#41f497'])
          .mode('hsl')
          .colors(isochronesControls[i].isochrones.results.length)

        const { settings } = isochronesControls[i]

        for (const isochrone of isochroneResultsReversed) {
          for (const isochroneComponent of isochrone.component) {
            const toolTipContent = this.getTooltipContent(settings, isochrone)
            this.addIsochrones(
              isochroneComponent.shape,
              toolTipContent,
              scaleHsl[cnt],
              i
            )
          }
          cnt += 1
        }
      }
    }
  }

  saveGeojson(features) {
    const isochronesSettings = []
    for (let feature of features.getLayers()) {
      isochronesSettings.push(feature.options.settings)
    }
    const geojson = features.toGeoJSON()
    for (let i = 0; i < geojson.features.length; i++) {
      geojson.features[i].properties.attribution =
        'Isochrones were generated by the HERE Maps API. Please read HERE Maps terms of service for further information https://legal.here.com/en-gb/terms.'
      geojson.features[i].properties.settings = isochronesSettings[i]
    }
    var blob = new Blob([JSON.stringify(geojson)], {
      type: 'text/plain;charset=utf-8'
    })
    const file = 'heremaps_' + isochronesSettings[0] + '.geojson'
    saveAs(blob, file)
  }

  updateMap(prevProps) {
    const { mapEvents } = this.props
    if (mapEvents.receivedAt > prevProps.mapEvents.receivedAt) {
      let eventFeatures = L.featureGroup()

      switch (mapEvents.event) {
        case 'ZOOM_TO_ISOCHRONES':
          isochronesLayer.eachLayer(function(layer) {
            if (layer.options.index === mapEvents.controlIndex)
              eventFeatures.addLayer(layer)
          })

          this.map.fitBounds(eventFeatures.getBounds(), {
            paddingTopLeft: [100, 100]
          })

          break
        case 'TOGGLE_ISOCHRONES':
          this.props.dispatch(hideIsochronesIndex(mapEvents.controlIndex))
          break
        case 'ZOOM_TO_POINT':
          this.map.flyTo(mapEvents.latLng, 14)

          break
        case 'DOWNLOAD_ISOCHRONES':
          isochronesLayer.eachLayer(function(layer) {
            if (layer.options.index === mapEvents.controlIndex)
              eventFeatures.addLayer(layer)
          })
          this.saveGeojson(eventFeatures)
          break

        default:
          break
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.updateMarkers()
    this.updateIsochrones(prevProps)
    this.updateMap(prevProps)
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
    const { dispatch, hereConfig } = this.props
    dispatch(
      fetchHereReverseGeocode({
        isoIndex: obj.isoIndex,
        hereConfig: hereConfig,
        ...obj.latLng
      })
    )
  }

  addIsochrones(geometry, tooltipContent, color, index) {
    L.polygon(
      geometry.map(function(coordString) {
        return coordString.split(',')
      }),
      {
        fillColor: color,
        weight: 2,
        opacity: 1,
        color: 'white',
        pane: 'isochronesPane',
        index: index,
        settings:
          tooltipContent.settings.mode + ',' + tooltipContent.settings.range
      }
    )
      .addTo(isochronesLayer)
      .bindTooltip(tooltipContent.html, { permanent: false, sticky: true })
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
        .openTooltip()
        .on('dragend', function(e) {
          that.updatePosition({
            latLng: e.target.getLatLng(),
            isoIndex: e.target.options.index
          })
        })
    } else {
      markersLayer.eachLayer(function(layer) {
        if (layer.options.index === idx) {
          if (location.title.length > 0) {
            if (layer.getTooltip()) {
              layer.setTooltipContent(
                location.title + ', ' + location.description
              )
            } else {
              layer
                .bindTooltip(location.title + ', ' + location.description, {
                  permanent: false
                })
                .openTooltip()
            }
          } else {
            layer.unbindTooltip()
          }
        }
      })
    }
  }

  render() {
    return <div id="map" style={style} />
  }
}

const mapStateToProps = (state, ownProps) => {
  //console.log(state, ownProps)
  const isochronesControls = state.isochronesControls.controls
  const mapEvents = state.mapEvents
  const hereConfig = state.hereConfig
  return {
    isochronesControls,
    mapEvents,
    hereConfig
  }
}

export default connect(mapStateToProps)(Map)
