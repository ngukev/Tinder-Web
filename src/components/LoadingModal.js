import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Modal, Spinner, Table } from 'react-bootstrap';
import { connect } from 'react-redux';

class LoadingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.renderBody = this.renderBody.bind(this);
    }
    renderBody() {
        if (this.props.likedList.length === 0) {
            return ("You liked no one!")
        }
        else {
            return (
                <Table>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.props.likedList.map((user, i) => {
                            return (<tr>
                                <td><img src={user.user.photos[0].url} alt="" style={{width:"50px", height:"50px"}}/></td>
                                <td>{user.user.name}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>)
        }
    }

    render() {
        // var spinnerCSS = {
        //     position: "absolute",
        //     top: "40%",
        //     left: "50%",
        //     marginTop: "-25px",
        //     marginLeft: "-50px"
        // }
        return (<Modal show={this.props.dispenserList.length > 0} onHide={e => { }}>
            <Modal.Header>
                <Modal.Title>Submitting Data...  <Spinner animation="border" variant="primary" style={{ right: "100%" }} /> </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {this.renderBody()}
            </Modal.Body>
        </Modal>);
    }

}

function mapStateToProps(state) {
    return {
        dispenserList: state.DispenserReducer.dispenserList,
        likedList: state.TinderReducer.likedList
    };
}

function mapDispatchToProps(dispatch) {
    return {}
}



export default connect(mapStateToProps, mapDispatchToProps)(LoadingModal);