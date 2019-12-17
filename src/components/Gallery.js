import React from 'react';
import { CardDeck } from 'react-bootstrap';
import { connect } from 'react-redux';
import '../css/app.css';
import TinderCard from './TinderCard';
import * as UserHelper from '../helpers/UserHelper';



class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.renderGallery = this.renderGallery.bind(this);
  }

  renderGallery() {

    var LIMIT = 10;
    var myCardList = [];
    this.props.recommendationList.forEach((user, i) => {
      myCardList.push(<TinderCard user={user} 
                                  userFound={UserHelper.findUserInTeaserList(user,this.props.teaserList)} 
                                  expandSidePanel={this.props.expandSidePanel} 
                                  defaultExpandBio={this.props.defaultExpandBio}/>);
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
      if(i === 0)
      {
        myCardDeck.push(<br key={"card br"}></br>);
      }
    }

    return (myCardDeck);
  }
  render() {
    return (
      <>
        <br></br>
        {this.renderGallery()}
      </>
    );
  }
}


function mapStateToProps(state)
{
  return {
    teaserList : state.TinderReducer.teaserList
  };
}

 export default connect(mapStateToProps)(Gallery);