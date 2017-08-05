import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import EvaluationTopbar from "../components/EvaluationTopbar/EvaluationTopbar"
import {
  NOMAD_WATCH_EVAL,
  NOMAD_UNWATCH_EVAL,
  NOMAD_WATCH_ALLOCS_SHALLOW,
  NOMAD_UNWATCH_ALLOCS_SHALLOW,
  NOMAD_WATCH_NODES,
  NOMAD_UNWATCH_NODES
} from "../sagas/event"

class Evaluation extends Component {
  componentWillMount() {
    this.props.dispatch({
      type: NOMAD_WATCH_EVAL,
      payload: this.props.params.evalId
    })
    this.props.dispatch({ type: NOMAD_WATCH_ALLOCS_SHALLOW })
    this.props.dispatch({ type: NOMAD_WATCH_NODES })
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: NOMAD_UNWATCH_EVAL,
      payload: this.props.params.evalId
    })
    this.props.dispatch({ type: NOMAD_UNWATCH_ALLOCS_SHALLOW })
    this.props.dispatch({ type: NOMAD_UNWATCH_NODES })
  }

  render() {
    if (this.props.evaluation == null) {
      return null
    }

    return (
      <div>
        <EvaluationTopbar {...this.props} />

        <div style={{ padding: 10, paddingBottom: 0 }}>
          <h2>
            Evaluation: {this.props.evaluation.ID}
          </h2>

          <br />

          {this.props.children}
        </div>
      </div>
    )
  }
}

function mapStateToProps({ evaluation }) {
  return { evaluation }
}

Evaluation.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  evaluation: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(Evaluation)
