import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as TinderAPIService from '../services/TinderAPIService';
import * as TinderActions from '../actions/TinderActions'
import { bindActionCreators } from 'redux';


class LoginModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: null,
            verificationCode: null
        };
    }

    render() {

        return (<Modal show={this.props.xAuthToken === null}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control placeholder="1 123 456 7890" onBlur={
                            e => {
                                var formattedPhoneNumber = e.target.value.replace(/\s/g,"");
                                this.setState({ phoneNumber: formattedPhoneNumber })
                                TinderAPIService.sendVerificationCode(formattedPhoneNumber);
                            }
                        } />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Verification Code</Form.Label>
                        <Form.Control onChange ={e => { this.setState({verificationCode : e.target.value})}}/>
                        {this.state.phoneNumber !== null ? <Form.Text className="text-muted"> Check Your Phone</Form.Text> : null}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" disabled={this.state.verificationCode === null} onClick = {e => {
                    if(this.state.phoneNumber !== null && this.state.verificationCode !== null)
                    {
                        var requestBody = {
                            phone_number : this.state.phoneNumber,
                            otp_code : this.state.verificationCode
                        }
                        this.props.TinderActions.getAuthToken(requestBody);
                    }
                }}>
                    Submit
              </Button>
            </Modal.Footer>
        </Modal>);
    }

}

function mapStateToProps(state) {
    return {
        xAuthToken: state.MetaDataReducer.xAuthToken
    };
}

function mapDispatchToProps(dispatch) {
    return {
        TinderActions: bindActionCreators(TinderActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);