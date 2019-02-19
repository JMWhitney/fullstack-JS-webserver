import React, { Component } from 'react';
import PropTypes from 'prop-types';
import validName from '../validationFrontEnd';

class Contest extends Component {

  componentDidMount() {
    this.props.fetchNames(this.props.nameIds);

    //Hide error message.
    document.getElementById("name-error").style.display = "none";
  };

  handleSubmit = (event) => {
    event.preventDefault();
    //Read the value that the user typed
    const nameInput = this.refs.newNameInput.value;
    if(validName(nameInput)) {
      this.props.addName(this.refs.newNameInput.value, this.props._id);
      //Clear input form
      this.refs.newNameInput.value = '';
      document.getElementById("name-error").style.display = "none";
    } else {
      document.getElementById("name-error").style.display = "block";
    }
  };

  //With the edit and delete functions we want to pass the nameId from the context in which
  //The functions were called. To do this with event handlers you use what is called currying.
  //The idea here is to create a function that accepts nameId,
  //and returns the event function. That way we have access to both variables.
  //ES5 syntax would look like:

  // handleEdit(nameId) {
  //   return function(event) {

  //   }
  // } 

  handleEdit = nameId => event => {
    event.preventDefault();
    this.props.editName(nameId);
  }

  handleDelete = nameId => event => {
    event.preventDefault();
    this.props.deleteName(nameId, this.props._id);
  }

  render() {
    return (
      <div className="Contest">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Contest Description</h3>
          </div>
          <div className="panel-body">
            <div className="contest-description">
              {this.props.description}
            </div>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Proposed Names</h3>
          </div>
          <div className="panel-body">
            <ul className="list-group">
            {this.props.nameIds.map(nameId => 
              <div key={nameId} className="flex-horizontal">
                <li className="list-group-item">
                  {this.props.lookupName(nameId).name}
                </li>
                <button onClick={this.handleEdit(nameId)} className="btn btn-info">Edit</button>
                <button onClick={this.handleDelete(nameId)} className="btn btn-danger">Delete</button>
              </div>
            )}
            </ul>
          </div>
        </div>

        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">Propose a New Name</h3>
          </div>
          <div className="panel-body">
            <span id="name-error" className="alert alert-danger">This is an invalid name. Please try again</span>
            <form onSubmit={this.handleSubmit}>
              <div className="input-group">
                <input type="text" 
                placeholder="New Name Here..."
                ref="newNameInput" 
                className="form-control" />
                <span className="input-group-btn">
                  <button type="submit" className="btn btn-success">Sumbit</button>
                </span>
              </div>
            </form>
          </div>
        </div>

        <div className="home-link link"
             onClick={this.props.contestListClick}>
          Contest List
        </div>
      </div>
    );
  }
}

//Type checking
Contest.propTypes = {
  _id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  contestListClick: PropTypes.func.isRequired,
  fetchNames: PropTypes.func.isRequired,
  nameIds: PropTypes.array.isRequired,
  lookupName: PropTypes.func.isRequired,
  addName: PropTypes.func.isRequired,
  editName: PropTypes.func.isRequired,
  deleteName: PropTypes.func.isRequired,
}
 
export default Contest;