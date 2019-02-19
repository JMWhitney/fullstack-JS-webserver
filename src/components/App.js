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

const onPopState = handler => {
  window.onpopstate = handler;
};

class App extends React.Component {
  
  static propTypes = {
    initialData: PropTypes.object.isRequired
  };

  state = this.props.initialData

  componentDidMount() {

    onPopState((event) => {
      this.setState({
        currentContestId: (event.state || {}).currentContestId
      })
    })

  }

  componentWillUnmount() {
    //We must clear this event otherwise there will be an error when
    //Navigating web history after the component has unmounted.
    onPopState(null);
  }

  fetchContest = (contestId) => {
    pushState(
      { currentContestId: contestId },
      `/contest/${contestId}`
    );

    //Look up the contest
    api.fetchContest(contestId).then(contest => {
      this.setState({
        currentContestId: contest._id,
        contests: {
          ...this.state.contests,
          [contest._id]: contest
        }
      });
    });
  };
  
  fetchContestList = () => {
    pushState(
      { currentContestId: null },
      `/`
    );

    //Look up the contest
    api.fetchContestList().then(contests => {
      this.setState({
        currentContestId: null,
        contests
      });
    });
  };

  fetchNames = (nameIds) => {
    if(nameIds.length === 0) {
      return;
    }
    api.fetchNames(nameIds).then(names => {
      this.setState({
        names
      });
    });
  }

  currentContest() {
    return this.state.contests[this.state.currentContestId];
  }
  
  pageHeader() {
    if(this.state.currentContestId) {
      return this.currentContest().contestName;
    }

    return 'Naming Contests';
  }

  lookupName = (nameId) => {
    if(!this.state.names || !this.state.names[nameId]) {
      return {
        name: '...'
      }
    }
    return this.state.names[nameId];
  };

  addName = (newName, contestId) => {
    api.addName(newName, contestId).then(resp => 
      this.setState({
        contests: {
          ...this.state.contests,
          [resp.updatedContest._id]: resp.updatedContest
        },
        names: {
          ...this.state.names,
          [resp.newName._id]: resp.newName
        }
      })
    )
  }

  editName = (nameId) => {
    console.log("Editing ", nameId);
    //Edit name in database
    api.editName(nameId);

    //Update state

  }

  deleteName = (nameId, contestId) => {
    console.log("Deleting ", nameId, " from ", contestId);
    //Delete name from database
    api.deleteName(nameId, contestId);


    //TODO: delete name from contest state
  }

  currentContent() {
    if (this.state.currentContestId) {
      return <Contest 
        contestListClick={this.fetchContestList}
        fetchNames={this.fetchNames}
        lookupName={this.lookupName}
        addName={this.addName}
        editName={this.editName}
        deleteName={this.deleteName}
        {...this.currentContest()}
      />;
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