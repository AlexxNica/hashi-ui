import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { NOMAD_WATCH_ALLOCS_SHALLOW, NOMAD_UNWATCH_ALLOCS_SHALLOW } from "../../sagas/event"
import AllocationList from "../AllocationList/AllocationList"

class ClientAllocations extends Component {
  componentWillMount() {
    this.props.dispatch({ type: NOMAD_WATCH_ALLOCS_SHALLOW })
  }

  componentWillUnmount() {
    this.props.dispatch({ type: NOMAD_UNWATCH_ALLOCS_SHALLOW })
  }

  render() {
    const nodeId = this.props.params.nodeId
    const allocs = this.props.allocations.filter(allocation => allocation.NodeID === nodeId)

    return <AllocationList showClientColumn={false} allocations={allocs} location={this.props.location} nested />
  }
}

function mapStateToProps({ allocations }) {
  return { allocations }
}

ClientAllocations.defaultProps = {
  allocations: [],
  params: {},
  location: {}
}

ClientAllocations.propTypes = {
  allocations: PropTypes.array.isRequired,
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(ClientAllocations)
