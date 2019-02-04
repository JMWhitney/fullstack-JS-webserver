import React from 'react';
import Header from './Header';
import ContestList from './ContestList';

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
    // axios.get('/api/contests')
    //   .then(resp => {
    //     console.info(resp.data.contests);
    //     this.setState({
    //       contests: resp.data.contests
    //     });
    //   })
    //   .catch(console.error);
  }

  componentWillUnmount() {
    //Clean timers, listeners
  }

  render() {
    return (
      <div className="App" >
        <Header message={this.state.pageHeader} />
        <ContestList contests={this.state.contests} />
      </div>
    );
  }
};

export default App