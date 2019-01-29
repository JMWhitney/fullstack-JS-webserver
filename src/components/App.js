import React from 'react';
import axios from 'axios';
import Header from './Header';
import ContestPreview from './ContestPreview';

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
    //ajax call to retrieve data 
    axios.get('/api/contests')
      .then(resp => {
        console.log(resp.data.contests);
        this.setState({
          contests: resp.data.contests
        });
      })
      .catch(console.error);
  }

  componentWillUnmount() {
    //Clean timers, listeners
  }

  render() {
    return (
      <div className="App" >
        <Header message={this.state.pageHeader} />
        <div>
          {this.state.contests.map(contest =>
            //Whenever you .map() you need to supply a unique id.
            <ContestPreview key={contest.id} {...contest} />
          )}
        </div>
      </div>
    );
  }
};

export default App