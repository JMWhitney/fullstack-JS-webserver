import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ContestPreview extends Component {
  handleClick = () => {
    console.log(this.props.contestName);
  };
  render() { 
    return ( 
      <div className="link ContestPreview" onClick={this.handleClick}>
        <div className="category-name">
          {this.props.categoryName}
        </div>
        <div className="contest-name">
          {this.props.contestName}
        </div>
    </div>
     );
  }
}

//We don't want a stateless functional component if we need to register event handling functions
//This is because a new function will be generated every time 

// const ContestPreview = (contest) => (
//   <div className="ContestPreview" onClick={...}>
//     <div className="category-name">
//       {contest.categoryName}
//     </div>
//     <div className="contest-name">
//       {contest.contestName}
//     </div>
//   </div>
// );

ContestPreview.propTypes = {
  categoryName: PropTypes.string.isRequired,
  contestName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ContestPreview;