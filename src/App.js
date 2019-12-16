import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Navbar } from 'react-bootstrap';
import Gallery from './components/Gallery';
import SidePanel from './components/SidePanel';
import './css/app.css';
import { fetchRecommendations, fetchTeasers } from './services/TinderAPIService';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userDataList: [],
      teaserList: [],
      sidePanelHeight: null,
      expandAllBio: false
    };
    this.renderNavBar = this.renderNavBar.bind(this);
    this.expandSidePanel = this.expandSidePanel.bind(this);
    this.expandAllBio = this.expandAllBio.bind(this);
  }

  expandAllBio() {
    this.setState({ expandAllBio: !this.state.expandAllBio })
  }
  expandSidePanel() {
    var height = document.getElementsByClassName("Gallery")[0].offsetHeight;
    height = height.toString(10) + "px";
    this.setState({ sidePanelHeight: height })
  }

  componentDidMount() {
    fetchRecommendations().then(response => {
      if (response != null && response.data.meta.status === 200) {
        this.setState({ userDataList: response.data.data.results })
      }
    })

    fetchTeasers().then(response => {
      if (response != null && response.data.meta.status === 200) {
        this.setState({ teaserList: response.data.data.results })
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (document.getElementsByClassName("Gallery") != null) {
      var height = document.getElementsByClassName("Gallery")[0].offsetHeight;
      height = height.toString(10) + "px";
      if (height !== this.state.sidePanelHeight) {
        this.setState({ sidePanelHeight: height })
      }
    }
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
    var sidePanelStyles = {
      width: "16%",
      height: this.state.sidePanelHeight,
      float: "left",
      backgroundColor: "#3a3a3a",
      paddingLeft: "5px"
    };

    var galleryPanelStyles = {
      width: "84%",
      float: "right",
      paddingLeft: "20px"
    }


    return (
      <div className="Main App">
        {this.renderNavBar()}
        <div className="Side Panel" style={sidePanelStyles}>
          <SidePanel teaserList={this.state.teaserList} 
                     userDataList={this.state.userDataList}
                     expandAllBio = {this.expandAllBio}
                     defaultExpandBio = {this.state.expandAllBio} />
        </div>
        <div className="Gallery" style={galleryPanelStyles}>
          <Gallery userDataList={this.state.userDataList} 
                   teaserList={this.state.teaserList} 
                   expandSidePanel={this.expandSidePanel}
                   defaultExpandBio={this.state.expandAllBio} />
        </div>
      </div>
    );
  }

}


export default App;
