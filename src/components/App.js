import React from 'react';
import Header from './Header';
import ContestList from './ContestList';

//This is an alias function for window.history.pushState
//The purpose of this is that history.pushState is not 
//supported by older browsers.
//If I wanted to support them I would only need to change this function
const pushState = (object, url) => 
  window.history.pushState(obj, '', url);

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { test: 42 };
  // }

  //This syntax is the same as the block above.
  state = {
    pageHeader: 'Naming Contests',
    contests: this.props.initialContests
  };

  //timers, listeners, ajax calls usually go here.
  componentDidMount() {

  }

  componentWillUnmount() {
    //Clean timers, listeners
  }

  fetchContest = (contestId) => {
    pushState(
      { currentContestId: contestId },
      `/contest/${contestId}`
    );
  };

  render() {
    return (
      <div className="App" >
        <Header message={this.state.pageHeader} />
        <ContestList 
          onContestClick={this.fetchContest}
          contests={this.state.contests} 
        />
      </div>
    );
  }
};

export default App