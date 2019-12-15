import React from 'react';
import { CardDeck } from 'react-bootstrap';
import '../css/app.css';
import { fetchRecommendations } from '../services/TinderAPIService';
import TinderCard from './TinderCard';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDataList: []
    };
    this.renderGallery = this.renderGallery.bind(this);
  }

  componentDidMount() {
    fetchRecommendations().then(response => {
      if (response != null && response.data.meta.status === 200) {
        this.setState({ userDataList: response.data.data.results })
      }
    })
  }

  renderGallery() {

    var LIMIT = 8;
    var myCardList = [];
    this.state.userDataList.forEach((user, i) => {
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