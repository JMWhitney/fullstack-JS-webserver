import React from 'react';
import PropTypes from 'prop-types';
import ContestPreview from './ContestPreview';

const ContestList = ({contests, onContestClick}) => {
  return(
    <div className="ContestList">
      {Object.keys(contests).map(contestId =>
        //Whenever you .map() you need to supply a unique id.
        <ContestPreview 
          key={contestId} 
          onClick={onContestClick}
          {...contests[contestId]} 
        />
      )}
    </div>
  )
};

//Type Checking
ContestList.propTypes = {
  contest: PropTypes.object,
  onContestClick: PropTypes.func.isRequired,
};
 
export default ContestList;