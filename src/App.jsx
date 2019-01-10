import React from 'react'
import Map from './Map/Map'
import Controls from './Controls/Controls'

class App extends React.Component {
  render() {
    return (
      <div>
        <Map />
        <Controls className={`isoControls`} />
      </div>
    )
  }
}
export default App
