import React from "react";
import Map from "./Map/Map";
import Controls from "./Controls/Controls";

const controlsStyle = {
  zIndex: 999,
  position: "absolute",
  width: "400px",
  top: "0",
  left: "10px",
  maxHeight: "calc(100vh - 2vw)",
};

class App extends React.Component {
  render() {
    return (
      <div>
        <Map />
        <Controls className={`isoControls`} style={controlsStyle} />
      </div>
    );
  }
}
export default App;
