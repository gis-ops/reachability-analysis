import React from "react";
import { connect } from "react-redux";
import L from "leaflet";
import ExtraMarkers from "./extraMarkers";
import {
  fetchHereReverseGeocode
} from "../actions/actions";

const style = {
  width: "100%",
  height: "100vh"
};

const CartoDB_VoyagerLabelsUnder = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png",
  {
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 19
  }
);

const markersLayer = L.layerGroup();

const mapParams = {
  center: [40.655769, -73.938503],
  zoomControl: false,
  zoom: 13,
  layers: [markersLayer, CartoDB_VoyagerLabelsUnder]
};

class Map extends React.Component {
  componentDidMount() {
    this.map = L.map("map", mapParams);

    L.control
      .zoom({
        position: "topright"
      })
      .addTo(this.map);
  }

  componentDidUpdate(prevProps, prevState) {
    const { isochronesMarkers } = this.props;

    let cnt = 0;

    for (let isochrones of isochronesMarkers) {
      // add marker
      if (isochrones.geocodeResults.length > 0) {
        for (let location of isochrones.geocodeResults) {
          if (location.selected) {
            // if a address is geocoded normally, clear layer beforehand

            if (!isochrones.reverse) this.clearLayerByIndex(cnt);

            if (this.isMarkerPresent(cnt)) {
              this.addIsochronesMarker(location, cnt, true);
            } else {
              this.addIsochronesMarker(location, cnt);
            }
          }
        }
      }

      cnt += 1;
    }
  }

  clearLayerByIndex(idx) {
    markersLayer.eachLayer(function(layer) {
      if (layer.options.index === idx) markersLayer.removeLayer(layer);
    });
  }

  isMarkerPresent(idx) {
    let isPresent = false;
    markersLayer.eachLayer(function(layer) {
      if (layer.options.index === idx) isPresent = true;
    });
    return isPresent;
  }

  updatePosition(obj) {
    console.log(this.props, obj);

    this.props.dispatch(
      fetchHereReverseGeocode({
        isoIndex: obj.isoIndex,
        ...obj.latLng
      })
    );
  }
  addIsochronesMarker(location, idx, isPresent = false) {
    console.log(location, idx);

    if (!isPresent) {
      const isochronesMarker = ExtraMarkers.icon({
        icon: "fa-number",
        markerColor: "blue",
        shape: "star",
        prefix: "fa",
        number: (idx + 1).toString()
      });

      const that = this;

      L.marker(location.DisplayPosition, {
        icon: isochronesMarker,
        draggable: true,
        index: idx
      })
        .addTo(markersLayer)
        .bindTooltip(location.title + ", " + location.description, {
          permanent: false
        })
        .on("dragend", function(e) {
          that.updatePosition({
            latLng: e.target.getLatLng(),
            isoIndex: e.target.options.index
          });
        });
    } else {
      markersLayer.eachLayer(function(layer) {
        if (layer.options.index === idx) {
          layer.unbindTooltip();
          layer.bindTooltip(location.title + ", " + location.description, {
            permanent: false
          });
        }
      });
    }
  }

  render() {
    return <div id="map" style={style} />;
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state, ownProps);

  const isochronesMarkers = state.isochronesControls.controls;

  return {
    isochronesMarkers
  };
};

export default connect(mapStateToProps)(Map);
