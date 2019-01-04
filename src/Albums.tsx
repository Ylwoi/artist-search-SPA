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
      const albumDiv = document.createElement("figure");
      const albumName = document.createElement("figcaption");
      const albumPic = document.createElement("img");

      albumDiv.setAttribute('class', 'column is-narrow columns is-2 is-multiline is-vcentered');
      albumName.setAttribute('class', 'column is-narrow is-11 is-centered');
      albumName.innerText = album.collectionName;
      albumPic.setAttribute('class', 'column is-narrow is-11');
      albumPic.setAttribute('src', album.artworkUrl100);

      albumDiv.appendChild(albumPic);
      albumDiv.appendChild(albumName);
      albumResultsDiv.appendChild(albumDiv);
    })
  }

  public render() {
    return (
      <div className="columns is-multiline is-centered is-mobile">
        <p className="albums-title title is-1 is-spaced">{this.props.artistName}'s All Albums</p>
        <div className="album-results columns is-multiline is-centered"/>
        <div className="column is-narrow is-full">
          <a className="button" onClick={this.props.goBack}>
            <span className="icon">
              <i className="fas fa-home"></i>
            </span>
            <span>Back to artist search</span>
          </a>
        </div>
      </div>
    );
  }
}

export default Albums;
