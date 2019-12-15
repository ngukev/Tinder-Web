import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
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
    fetchRecommendations().then(response =>{
      console.log(response,response.meta);
      if(response != null && response.data.meta.status === 200)
      {
        this.setState({userDataList : response.data.data.results})
      }
    })

    // if (data != null && data.meta.status === 200) {
    //   this.setState({ userDataList: data.data.results });
    // }
  }

  renderGallery() {

    const LIMIT = 8;
    var myCardList = [];

    this.state.userDataList.map((user, i) => {
      myCardList.push(<TinderCard user={user}/>);
    });

    var finalCardGalleryList = [];

    for (var i = 0; i < LIMIT; i += 4) {
      finalCardGalleryList.push(
      <Row key={i}>
        <Col>
          {myCardList[i]}
        </Col>
        <Col>
          {myCardList[i + 1]}
        </Col>
        <Col>
          {myCardList[i + 2]}
        </Col>
        <Col>
          {myCardList[i + 3]}
        </Col>
      </Row>)
    }

    return (
    <Container>
      {finalCardGalleryList}
    </Container>)
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