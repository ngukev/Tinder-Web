import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';

class LoadingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        var spinnerCSS = {
            position: "absolute",
            top: "40%",
            left: "50%",
            marginTop: "-25px",
            marginLeft: "-50px"
        }
        return (<Modal show={this.props.dispenserList.length > 0} onHide={e => { }}>
            {/* <Modal.Header>
                <Modal.Title>Submitting Data...  <Spinner animation="border" variant="primary" style={{right:"100%"}} /> </Modal.Title>
            </Modal.Header> */}
            <Modal.Body><Modal.Title>Submitting Data...  <Spinner animation="border" variant="primary" style={{ right: "100%" }} /> </Modal.Title> </Modal.Body>
        </Modal>);
    }

}

function mapStateToProps(state) {
    return {
        dispenserList: state.DispenserReducer.dispenserList
    };
}

function mapDispatchToProps(dispatch) {
    return {}
}



export default connect(mapStateToProps, mapDispatchToProps)(LoadingModal);