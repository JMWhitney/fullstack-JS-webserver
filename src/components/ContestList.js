import React from 'react';
import PropTypes from 'prop-types';
import ContestPreview from './ContestPreview';

const ContestList = ({contests, onContestClick}) => {
  return(
    <div className="ContestList">
      {contests.map(contest =>
        //Whenever you .map() you need to supply a unique id.
        <ContestPreview 
          key={contest.id} 
          onClick={onContestClick}
          {...contest} 
        />
      )}
    </div>
  )
};

//Type Checking
ContestList.propTypes = {
  contest: PropTypes.array,
  onContestClick: PropTypes.func.isRequired,
};
 
export default ContestList;