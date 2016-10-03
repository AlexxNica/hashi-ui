import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import NomadLink from '../components/link';
import FormatBoolean from '../components/format/boolean';
import NodeStatus from '../components/node/status';

const Nodes = ({ nodes }) =>
  <div className="row">
    <div className="col-md-12">
      <div className="card">
        <div className="header">
          <h4 className="title">Nodes</h4>
        </div>
        <div className="content table-responsive table-full-width">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Datacenter</th>
                <th>Name</th>
                <th>Class</th>
                <th>Drain</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {nodes.map(node =>
                <tr key={ node.ID }>
                  <td><NomadLink nodeId={ node.ID } short="true" /></td>
                  <td>{node.Datacenter}</td>
                  <td>{node.Name}</td>
                  <td>{node.Class ? node.Class : '<none>'}</td>
                  <td><FormatBoolean value={ node.Drain } /></td>
                  <td><NodeStatus value={ node.Status } /></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>;

function mapStateToProps({ nodes }) {
    return { nodes };
}

Nodes.propTypes = {
    nodes: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(Nodes);