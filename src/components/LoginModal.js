import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as TinderAPIService from '../services/TinderAPIService';

class LoginModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: null
        };
    }

    render() {

        return (<Modal show={true}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control placeholder="1 123 456 7890" onBlur={
                            e => {
                                var formattedPhoneNumber = e.target.value.replace(" ","");
                                this.setState({ phoneNumber: formattedPhoneNumber})
                                TinderAPIService.sendVerificationCode(formattedPhoneNumber);

                            }
                        } />
                    </Form.Group>
                    {this.state.phoneNumber !== null ?
                        <Form.Group>
                            <Form.Label>Verification Code</Form.Label>
                            <Form.Control />
                            <Form.Text className="text-muted">
                                Check Your Phone
                            </Form.Text>
                        </Form.Group> :
                        null}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" >
                    Submit
              </Button>
            </Modal.Footer>
        </Modal>);
    }

}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {}
}



export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);