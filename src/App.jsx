import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Map from './Map/Map'
import Controls from './Controls/Controls'
import { SemanticToastContainer, toast } from 'react-semantic-toasts'

class App extends React.Component {
  static propTypes = {
    resultHandler: PropTypes.object
  }

  componentDidUpdate(prevProps, prevState) {
    const { resultHandler } = this.props

    toast({
      type: 'info',
      icon: 'info',
      title: resultHandler.handlerTopic,
      description: resultHandler.handlerMessage,
      time: 5000
    })
  }

  render() {
    return (
      <div>
        <Map />
        <Controls className={'isoControls'} />
        <SemanticToastContainer position="bottom-center" />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { resultHandler } = state
  return {
    resultHandler
  }
}

export default connect(mapStateToProps)(App)
