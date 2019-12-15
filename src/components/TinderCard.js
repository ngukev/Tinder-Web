import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import '../css/app.css';
import moment from 'moment';

class TinderCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter:0,
            showBio : false
        };
        this.changePhotos = this.changePhotos.bind(this);
        this.showBio = this.showBio.bind(this);
        // this.renderBio
    }

    changePhotos()
    {
        if(this.state.counter === this.props.user.user.photos.length-1)
        {
            this.setState({counter: 0})
        }
        else
        {
            this.setState({counter: this.state.counter + 1})
        }
    }
    showBio()
    {
        this.setState({showBio : !this.state.showBio})
    }

    render() {

        var cardImageStyles = {
            width: "100%",
            height: "17vw",
            objectFit: "cover"
        };
        var user = this.props.user;
        var currentCounter = this.state.counter;
        return (
            <div className="TinderCard">
                <Card style={{ width: '18rem' }} key={user.user._id}>
                    <Card.Img variant="top" src={user.user.photos[currentCounter].url} style={cardImageStyles} onClick={e => this.changePhotos()} />
                    <Card.Body>
                        <Card.Title><Button block onClick={e => {this.showBio()}}>{user.user.name + ", " + calculateAge(user.user.birth_date)}</Button></Card.Title>
                        <Card.Text>
                            {this.state.showBio === true ? user.user.bio : null}
                        </Card.Text>
                        <FontAwesomeIcon icon={faStar}  style={{float:"left",width: "20px"}} onClick= {e => {console.log("clicked btich")}} />
                        <Form>
                            <Form.Group controlId="formBasicCheckbox">
                                <Form.Check style={{float:"right"}} type="checkbox" label="Like" />
                            </Form.Group>
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