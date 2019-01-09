import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Segment, Button, Popup, Icon, Divider } from "semantic-ui-react";
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
      <Segment class="flex flex-column" {...this.props}>
        <div
          style={{ height: "50px" }}
          className="flex justify-between items-center"
        >
          <span className="b f4">HERE Isolines App</span>
          <Icon name="setting" size="large" color="grey" />
          
        </div>
        <div>
          <div style={{ flex: 1, display: "flex", minHeight: "0px" }}>
            <div style={{ flex: 1, overflow: "auto" }}>
              <div
                style={{ maxHeight: "calc(100vh - 10vw)", overflow: "auto" }}
              >
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
              </div>
            </div>
          </div>
        </div>
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
