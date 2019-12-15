import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Navbar } from 'react-bootstrap';
import Gallery from './components/Gallery';
import SidePanel from './components/SidePanel';
import './css/app.css';
import { fetchRecommendations } from './services/TinderAPIService';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userDataList: []
    };
    this.renderNavBar = this.renderNavBar.bind(this);
  }

  componentDidMount() {
    fetchRecommendations().then(response => {
      if (response != null && response.data.meta.status === 200) {
        console.log("MY RECS: ",response.data.data.results);
        this.setState({ userDataList: response.data.data.results })
      }
    })
  }


  renderNavBar() {
    return (
      <div className="Nav Bar">
        <Navbar bg="danger" variant="dark" style={{}}>
          <Navbar.Brand href="#home">

            <span role="img" aria-label="fire">🔥</span>
          </Navbar.Brand>
          <Navbar.Brand href="#home">
            Tinder 2.0
        </Navbar.Brand>
        </Navbar>
      </div>);
  }

  render() {
    return (
      <div className="Main App">
        {this.renderNavBar()}
        <br></br>
          <div className="Side Panel" style={{width: "16%", float:"left"}}><SidePanel/></div>
          <div className="vertical-line"></div>
          <div className="Gallery" style={{width: "83%", float:"right"}}><Gallery userDataList={this.state.userDataList}/></div>
      </div>
    );
  }

}


export default App;
