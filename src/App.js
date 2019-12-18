import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Navbar, Toast } from 'react-bootstrap';
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
      sidePanelHeight: "auto",
      expandAllBio: false,
      showToast: false,
      message: ""
    };
    this.renderNavBar = this.renderNavBar.bind(this);
    this.expandSidePanel = this.expandSidePanel.bind(this);
    this.expandAllBio = this.expandAllBio.bind(this);
    this.showToast = this.showToast.bind(this);
    this.renderToast = this.renderToast.bind(this);
  }

  showToast(value, message = "") {
    this.setState({ showToast: value, message: message })
  }
  expandAllBio() {
    this.setState({ expandAllBio: !this.state.expandAllBio })
  }
  expandSidePanel() {
    var height = document.getElementsByClassName("Gallery")[0].offsetHeight;
    height = height.toString(10) + "px";
    this.setState({ sidePanelHeight: height })
  }

  renderToast() {
    var toastCss = {
      position: "absolute",
      top: 0,
      right: 0
    };
    if (this.state.showToast === true) {
      var message = this.state.message === "." ? "You passed on everyone!" : this.state.message;
      if (message !== "You passed on everyone!") {
        message = "You liked: " + message;
      }

      return (
        <div className="Toast Panel" style={toastCss}>
          <Toast onClose={() => this.showToast(false)} show={this.state.showToast} delay={3000} autohide>
            <Toast.Header>
              <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
              <strong className="mr-auto">Tinder 2.0</strong>
              <small>Now</small>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
          </Toast>
        </div>
      )
    }
    return null;
  }
  componentDidMount() {
    this.props.TinderActions.fetchRecommendations();
    this.props.TinderActions.fetchTeasers();
    this.props.TinderActions.fetchProfile();
  }

  componentDidUpdate(prevProps, prevState) {
    if (document.getElementsByClassName("Gallery") != null) {
      var height = document.getElementsByClassName("Gallery")[0].offsetHeight < 1025 ? 1025 : document.getElementsByClassName("Gallery")[0].offsetHeight;
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
      float: "left",
      paddingLeft: "30px"
    }

    return (

      <div className="Main App" >
        {this.renderNavBar()}
        <div className="Side Panel" style={sidePanelStyles}>
          <SidePanel expandAllBio={this.expandAllBio}
            defaultExpandBio={this.state.expandAllBio}
            incrimentCounter={this.incrimentCounter}
            showToast={this.showToast} />
        </div>
        {this.renderToast()}
        <div className="Gallery" style={galleryPanelStyles}>
          <Gallery expandSidePanel={this.expandSidePanel}
            defaultExpandBio={this.state.expandAllBio} />
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    recommendationList: state.TinderReducer.recommendationList,
    teaserList: state.TinderReducer.teaserList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    TinderActions: bindActionCreators(TinderActions, dispatch)
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(App);