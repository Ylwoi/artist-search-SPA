import * as React from 'react';

import './Albums.css';

class Albums extends React.Component<any, any> {
  constructor (props: any) {
    super(props);
  }
  componentDidMount() {
    this.searchAlbums()
  }
  public searchAlbums () {
    const searchTerm: string = this.props.artistName.split(' ').join('+');
    const searchURL: string = 'https://itunes.apple.com/search?term=' + searchTerm + '&entity=album';

    fetch(searchURL)
      .then((response: any) => {
        if(response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then((albums: any) => {
        this.showAlbums(albums.results);
      })
      .catch((error: any) => {
        console.error(error.message);
      })
  }
  public showAlbums (albums: any[]) {
    const albumResultsDiv = document.getElementsByClassName("album-results")[0];
    while(albumResultsDiv.firstChild) {
      albumResultsDiv.removeChild(albumResultsDiv.firstChild);
    }
    console.log(albums);
    albums.forEach( (album) => {
      const albumDiv = document.createElement("div");
      const albumName = document.createElement("p");
      const albumPic = document.createElement("img");

      albumDiv.setAttribute('class', 'album-result');
      albumName.setAttribute('class', 'artist-button');
      albumName.innerText = album.collectionName;
      albumPic.setAttribute('src', album.artworkUrl100);

      albumDiv.appendChild(albumPic);
      albumDiv.appendChild(albumName);
      albumResultsDiv.appendChild(albumDiv);
    })
  }

  public render() {
    return (
      <div>
        <h1>Albums</h1>
        <a className="back-button" onClick={this.props.goBack}>Back to artist search</a>
        <div className="album-results"/>
      </div>
    );
  }
}

export default Albums;
