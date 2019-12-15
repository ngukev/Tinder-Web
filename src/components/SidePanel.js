import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Card } from 'react-bootstrap';
import { fetchTeaser } from '../services/TinderAPIService';


class SidePanel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      teaserList: [],
      counter: 0
    };
    this.changePhoto = this.changePhoto.bind(this);
  }

  changePhoto() {
    if(this.state.counter === this.state.teaserList.length-1)
    {
        this.setState({counter: 0})
    }
    else
    {
        this.setState({counter: this.state.counter + 1})
    }
  }
  componentDidMount() {
    fetchTeaser().then(response => {
      if (response != null && response.data.meta.status === 200) {
        console.log("MY TEASSER RESPONSE: ",response);
        this.setState({ teaserList: response.data.data.results })
      }
    })
  }
  render() {
    var cardImageStyles = {
      width: "100%",
      height: "17vw",
      objectFit: "cover"
    };
    // data.data.results[""0""].user.photos[""0""].url
    var counter = this.state.counter;
    console.log("MY TEASER LIST ",this.state.teaserList)
    if(this.state.teaserList.length > 0)
    {
      return (
        <div className="Teaser Card">
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={this.state.teaserList[counter].user.photos[0].url} 
              style={cardImageStyles} 
              onClick={e => {this.changePhoto()}}/>
            <Card.Body>
              <Card.Title>???</Card.Title>
            </Card.Body>
          </Card>
        </div>)
    }
    return null;
  }
}



export default SidePanel;
