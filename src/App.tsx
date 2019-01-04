import * as React from 'react';

import { Button } from "react-bulma-components/full";

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
      const  artistButton = document.createElement('a');

      artistDiv.setAttribute('class', 'column is-narrow');
      artistButton.setAttribute('class', 'button is-info is-large is-outlined');
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
        <div className="columns is-multiline is-centered is-mobile">
          <p className="main-title title is-spaced">SEARCH ARTISTS'S ALL ALBUMS</p>
          <div className="column is-8 is-narrow">
            <input className="input is-primary is-rounded is-medium" type="text" onChange={this.updateValue}/>
          </div>
          <div className="column is-narrow">
            <Button color="danger" size="medium" onClick={this.searchArtist}>Search</Button>
          </div>
          <div className="columns is-multiline is-four-fifths is-narrow is-centered is-mobile search-results"/>
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
