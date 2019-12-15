import React from 'react';
import { CardDeck, CardColumns } from 'react-bootstrap';
import '../css/app.css';
import { fetchRecommendations } from '../services/TinderAPIService';
import TinderCard from './TinderCard';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderGallery = this.renderGallery.bind(this);
  }


  renderGallery() {

    var LIMIT = 10;
    var myCardList = [];
    this.props.userDataList.forEach((user, i) => {
      myCardList.push(<TinderCard user={user} />);
    });
    var myCardDeck = [];
    for (var i = 0; i < LIMIT; i += 5) {
      myCardDeck.push(<CardDeck key={i}>
        {myCardList[i]}
        {myCardList[i + 1]}
        {myCardList[i + 2]}
        {myCardList[i + 3]}
        {myCardList[i + 4]}
      </CardDeck>)
    }

    return (myCardDeck);
  }
  render() {
    return (
      <div className="Gallery">
        {this.renderGallery()}
      </div>
    );
  }
}

export default Gallery;