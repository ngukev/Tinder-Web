import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Navbar } from 'react-bootstrap';
import Gallery from './components/Gallery';
import SidePanel from './components/SidePanel';
import './css/app.css';
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};

    this.renderNavBar = this.renderNavBar.bind(this);
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
          <div className="Side Panel" style={{width: "17%", float:"left"}}><SidePanel/></div>
          <div className="Gallery" style={{width: "83%", float:"right"}}><Gallery/></div>
      </div>
    );
  }

}


export default App;
