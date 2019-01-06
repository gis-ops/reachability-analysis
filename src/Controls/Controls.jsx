import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Segment, Button, Popup } from "semantic-ui-react";
import SearchControl from "./SearchControl";
import { addIsochronesControl } from "../actions/actions";

class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddIsochronesControl = this.handleAddIsochronesControl.bind(
      this
    );
  }

  handleAddIsochronesControl = () => {
    this.props.dispatch(addIsochronesControl());
  };

  render() {
    const { controls } = this.props;
    return (
      <Segment {...this.props}>
        {controls &&
          controls.map((object, i) => (
            <SearchControl key={i} controlIndex={i} />
          ))}

        <Popup
          trigger={
            <Button
              circular
              icon="plus"
              color=""
              onClick={this.handleAddIsochronesControl}
            />
          }
          content="Add"
          size="mini"
        />
      </Segment>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  const { controls } = state.isochronesControls;
  console.log(controls);
  return {
    controls
  };
};

export default connect(mapStateToProps)(Controls);
