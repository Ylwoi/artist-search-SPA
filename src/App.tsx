import * as React from 'react';
import './App.css';

interface ISearchStates {
  searchText: string;
}

class App extends React.Component<{}, ISearchStates> {
  constructor (props: any) {
    super(props);
    
    this.updateValue = this.updateValue.bind(this);
    this.searchArtist = this.searchArtist.bind(this);
  }
  public searchArtist () {
    console.log(this.state.searchText);
  }
  public updateValue (evt: any) {
    this.setState({searchText: evt.target.value});
    console.log(evt.target.value);
  }
  public render() {
    return (
      <div>
        <input type="text" onChange={this.updateValue}/>
        <button onClick={this.searchArtist}>Search</button>
      </div>
    );
  }
}

export default App;
