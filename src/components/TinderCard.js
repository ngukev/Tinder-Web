import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import '../css/app.css';
import moment from 'moment';

class TinderCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
            showBio: false,
        };
        this.changePhotos = this.changePhotos.bind(this);
        this.showBio = this.showBio.bind(this);
        this.determineToShowBio = this.determineToShowBio.bind(this);
        this.generateTinderBio = this.generateTinderBio.bind(this);
    }

    changePhotos() {
        if (this.state.counter === this.props.user.user.photos.length - 1) {
            this.setState({ counter: 0 })
        }
        else {
            this.setState({ counter: this.state.counter + 1 })
        }
    }
    showBio() {
        this.setState({ showBio: !this.state.showBio })
        this.props.expandSidePanel();
    }
    determineToShowBio() {
        var myResult = false;

        return myResult;
    }
    generateTinderBio() {
        var user = this.props.user;
        var schoolEmoji = <span role="img" aria-label="School">🏫</span>;
        var workEmoji = <span role="img" aria-label="Work">💼</span>;
        var locationEmoji = <span role="img" aria-label="Location">📍</span>;
        var schoolBio = "";
        if (user.user.schools.length > 0) {
            schoolBio = user.user.schools[0].name;
        }

        var workBio = "";
        if (user.user.jobs.length > 0) {
            if (user.user.jobs[0].company != null) {
                workBio += user.user.jobs[0].company.name;
            }
            if (user.user.jobs[0].title != null) {
                workBio += user.user.jobs[0].title.name;
            }
        }

        var distanceAway = "";
        if (user.distance_mi != null) {
            distanceAway = user.distance_mi.toString(10) + " Miles Away.";
        }

        var bio = user.user.bio;
        return (
            <>
                {schoolBio !== "" ? schoolEmoji : null}
                {schoolBio !== "" ? schoolBio : null}
                {schoolBio !== "" ? <br></br> : null}
                {workBio !== "" ? workEmoji : null}
                {workBio !== "" ? workBio : null}
                {workBio !== "" ? <br></br> : null}
                {distanceAway !== "" ? locationEmoji : null}
                {distanceAway !== "" ? distanceAway : null}
                {distanceAway !== "" ? <br></br> : null}
                {bio}
            </>
        );

    }

    render() {

        var cardImageStyles = {
            width: "100%",
            height: "17vw",
            objectFit: "cover"
        };
        var user = this.props.user;
        var currentCounter = this.state.counter;

        var backgroundColor = this.props.userFound === true ? "danger" : "light";
        var buttonColor = this.props.userFound === true ? "secondary" : "outline-primary";

        var counterLabel = this.state.counter + 1;
        counterLabel = " (" + counterLabel.toString(10) + "/" + this.props.user.user.photos.length.toString(10) + ")";

        var headerLabel = user.user.name + ", " + calculateAge(user.user.birth_date) + " " + counterLabel;

        var buttonLabel = this.state.showBio === true ? "Minimize Bio" : "Expand Bio";

        this.generateTinderBio();

        return (
            <div className="TinderCard">
                <Card bg={backgroundColor} border="dark" style={{ width: '19rem' }} key={user.user._id}>
                    <Card.Header style={{
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "19px"
                    }}>{headerLabel}</Card.Header>
                    <Card.Img variant="top" src={user.user.photos[currentCounter].url} style={cardImageStyles} onClick={e => this.changePhotos()} />
                    <Card.Body>
                        <Card.Title><Button variant={buttonColor} block onClick={e => { this.showBio() }}>{buttonLabel}</Button></Card.Title>
                        <Card.Text>
                            {this.state.showBio === true || this.props.defaultExpandBio === true ? this.generateTinderBio() : null}
                        </Card.Text>

                        <Form>
                            <Card.Footer>
                                <FontAwesomeIcon icon={faStar} style={{ float: "left", width: "20px" }} color="#21b3bf" onClick={e => { console.log("clicked btich") }} />
                                <Form.Group controlId="formBasicCheckbox" key={user.user._id + " checkbox"}>
                                    <Form.Check style={{ float: "right" }} type="checkbox" label="Like" />
                                </Form.Group>
                            </Card.Footer>
                        </Form>

                    </Card.Body>
                </Card>
            </div>
        );
    }
}

function calculateAge(birthdayString) {
    var formattedBirthdayString = birthdayString.split("T")[0];
    return moment(formattedBirthdayString, "YYYY-MM-DD").fromNow().split(" ")[0];
}

export default TinderCard;