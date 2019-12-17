import 'bootstrap/dist/css/bootstrap.min.css';
import React,{Component} from 'react';
import { Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TinderActions from './actions/TinderActions';
import Gallery from './components/Gallery';
import SidePanel from './components/SidePanel';
import './css/app.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sidePanelHeight: "1025px",
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
    this.props.TinderActions.fetchRecommendations();
    this.props.TinderActions.fetchTeasers();
    this.props.TinderActions.fetchProfile();
  }

  componentDidUpdate(prevProps, prevState) {
    if (document.getElementsByClassName("Gallery") != null) {
      var height = document.getElementsByClassName("Gallery")[0].offsetHeight < 1025 ? "1025" : document.getElementsByClassName("Gallery")[0].offsetHeight;
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
      width: "20%",
      height: this.state.sidePanelHeight,
      float: "left",
      backgroundColor: "#3a3a3a"
    };

    var galleryPanelStyles = {
      width: "80%",
      float: "right",
      paddingLeft: "100px"
    }


    return (
      <div className="Main App">
        {this.renderNavBar()}
        <div className="Side Panel" style={sidePanelStyles}>
          <SidePanel expandAllBio = {this.expandAllBio}
                     defaultExpandBio = {this.state.expandAllBio}
                     incrimentCounter = {this.incrimentCounter} />
        </div>
        <div className="Gallery" style={galleryPanelStyles}>
          <Gallery  expandSidePanel={this.expandSidePanel}
                   defaultExpandBio={this.state.expandAllBio} />
        </div>
      </div>
    );
  }

}

function mapStateToProps(state)
{
  return {
    recommendationList : state.TinderReducer.recommendationList,
    teaserList : state.TinderReducer.teaserList
  };
}

function mapDispatchToProps(dispatch)
{
  return{
    TinderActions : bindActionCreators(TinderActions,dispatch)
  }
}



 export default connect(mapStateToProps, mapDispatchToProps)(App);