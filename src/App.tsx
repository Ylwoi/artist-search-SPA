import * as React from 'react';

import Albums from './Albums';
import './App.css';

interface IStates {
  searchText: string;
  albumsView: boolean;
  artistName?: string;
}

class App extends React.Component<any, IStates> {
  constructor (props: any) {
    super(props);
    this.state = {
      searchText: '',
      albumsView: false
    }

    this.updateValue = this.updateValue.bind(this);
    this.searchArtist = this.searchArtist.bind(this);
    this.setArtistView = this.setArtistView.bind(this);
  }
  public searchArtist () {
    const searchTerm: string = this.state.searchText.split(' ').join('+');
    const searchURL: string = 'https://itunes.apple.com/search?term=' + searchTerm + '&entity=musicArtist';

    fetch(searchURL)
      .then((response: any) => {
        if(response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((artists: any) => {
        console.log(artists.results);
        this.showArtists(artists.results);
      })
      .catch((error: any) => {
        console.error(error.message);
      })
  }
  public showArtists (artists: any[]) {
    const searchResultsDiv = document.getElementsByClassName("search-results")[0];
    while(searchResultsDiv.firstChild) {
      searchResultsDiv.removeChild(searchResultsDiv.firstChild);
    }
    artists.forEach( (artist) => {
      const artistDiv = document.createElement("div");
      const  artistButton = document.createElement('p');

      artistDiv.setAttribute('class', 'artist-result');
      artistButton.setAttribute('class', 'artist-button');
      artistButton.setAttribute('id', artist.artistId);
      artistButton.onclick = () => { this.setAlbumsView(artist.artistName) }
      artistButton.innerText = artist.artistName;
      artistDiv.appendChild(artistButton);
      searchResultsDiv.appendChild(artistDiv);
    })
  }

  public updateValue (evt: any) {
    this.setState({searchText: evt.target.value});
  }
  public setAlbumsView (artist: string) {
    this.setState({artistName:artist});
    this.setState({albumsView:true});
  }
  public setArtistView () {
    this.setState({albumsView:false});
  }
  public render() {
    if (!this.state.albumsView) {
      return (
        <div>
          <div className="artist-search-div">
            <input type="text" onChange={this.updateValue}/>
            <button onClick={this.searchArtist}>Search</button>
            <div className="search-results"/>
          </div>
        </div>
      );
    } else {
      return (
        <Albums artistName={this.state.artistName} goBack={this.setArtistView}/>
      );
    }

  }
}

export default App;
