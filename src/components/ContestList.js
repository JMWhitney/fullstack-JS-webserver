import React from 'react';
import PropTypes from 'prop-types';
import ContestPreview from './ContestPreview';

const ContestList = ({contests}) => {
  <div className="ContestList">
    {this.state.contests.map(contest =>
      //Whenever you .map() you need to supply a unique id.
      <ContestPreview key={contest.id} {...contest} />
    )}
  </div>
}

//Type Checking
ContestList.propTypes = {
  contest: PropTypes.array
}

 
export default ContestList;