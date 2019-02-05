import React from 'react';
import Header from './Header';
import ContestList from './ContestList';
import Contest from './Contest';
import * as api from '../api'
import PropTypes from 'prop-types';

//This is an alias function for window.history.pushState
//The purpose of this is that history.pushState is not 
//supported by older browsers.
//If I wanted to support them I would only need to change this function
//An alternative would be the react router api for complex routing
const pushState = (obj, url) => 
  window.history.pushState(obj, '', url);

class App extends React.Component {
  
  static propTypes = {
    initialData: PropTypes.object.isRequired
  };

  state = this.props.initialData

  componentDidMount() {
    //timers, listeners, ajax calls usually go here.
  }

  componentWillUnmount() {
    //Clean timers, listeners
  }

  fetchContest = (contestId) => {
    pushState(
      { currentContestId: contestId },
      `/contest/${contestId}`
    );

    //Look up the contest
    api.fetchContest(contestId).then(contest => {
      this.setState({
        currentContestId: contest.id,
        contests: {
          ...this.state.contests,
          [contest.id]: contest
        }
      });
    });

  };
  
  currentContest() {
    return this.state.contests[this.state.currentContestId];
  }
  
  pageHeader() {
    if(this.state.currentContestId) {
      return this.currentContest().contestName;
    }

    return 'Naming Contests';
  }

  currentContent() {
    if (this.state.currentContestId) {
      return <Contest {...this.currentContest()} />;
    }

    return <ContestList 
              onContestClick={this.fetchContest}
              contests={this.state.contests} 
            />
  }

  render() {
    return (
      <div className="App" >
        <Header message={this.pageHeader()} />
        {this.currentContent()}
      </div>
    );
  }
};

export default App