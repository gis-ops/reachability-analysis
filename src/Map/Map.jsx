import React from "react";
import { connect } from "react-redux";
import L from "leaflet";
import ExtraMarkers from "./extraMarkers";
import {
  updatePosition
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
    // create map
    this.map = L.map("map", mapParams);

    //add zoom control with your options
    L.control
      .zoom({
        position: "topright"
      })
      .addTo(this.map);
  }

  componentDidUpdate(prevProps, prevState) {
    const { isochronesMarkers } = this.props;
    let cnt = 0;

    this.clearAllLayers();

    for (let isochrones of isochronesMarkers) {
      if (isochrones.geocodeResults.length > 0) {
        for (let location of isochrones.geocodeResults) {
          if (location.selected) {
            this.addIsochronesMarker(location, cnt);
          }
        }
      }
      cnt += 1;
    }
  }

  clearAllLayers() {
    markersLayer.eachLayer(function(layer) {
      markersLayer.removeLayer(layer);
    });
  }

  updatePosition(obj) {
    console.log(obj);
    
    this.props.dispatch(
      updatePosition({
        isoIndex: obj.isoIndex,
        latLng: obj.latLng
      })
    );

  }
  addIsochronesMarker(location, cnt) {
    console.log(location, cnt);
    // Creates a red marker with the coffee icon
    const isochronesMarker = ExtraMarkers.icon({
      icon: "fa-number",
      markerColor: "blue",
      shape: "star",
      prefix: "fa",
      number: (cnt + 1).toString()
    });

    const that = this;

    L.marker(location.DisplayPosition, {
      icon: isochronesMarker,
      draggable: true,
      index: cnt
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
