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
    const searchTerm: string = this.state.searchText.split(' ').join('+');
    const searchURL: string = 'https://itunes.apple.com/search?term=' + searchTerm + '&entity=allArtist&attribute=allArtistTerm';

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
        console.error(error.massege);
      })
  }
  public showArtists (artists: any[]) {
    const searchResultsDiv = document.getElementsByClassName("search-results")[0];
    artists.forEach( (artist) => {
      const artistDiv = document.createElement("div");
      const artistButton = document.createElement("p");

      artistDiv.setAttribute('class', 'artist-result');
      artistButton.setAttribute('class', 'artist-button');
      artistButton.setAttribute('id', artist.artistId);
      artistButton.onclick = () => { this.showAlbums(artist.artistId) }
      artistButton.innerText = artist.artistName;
      artistDiv.appendChild(artistButton);
      searchResultsDiv.appendChild(artistDiv);
    })
  }
  public showAlbums (artistID: string) {
    console.log(artistID);
  }
  public updateValue (evt: any) {
    this.setState({searchText: evt.target.value});
  }
  public render() {
    return (
      <div>
        <input type="text" onChange={this.updateValue}/>
        <button onClick={this.searchArtist}>Search</button>
        <div className="search-results"/>
      </div>
    );
  }
}

export default App;
