import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import moment from 'moment';

class SidePanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            counter: 0,
            showBio : false
        };
        this.changePhoto = this.changePhoto.bind(this);
        this.renderTeaserCard = this.renderTeaserCard.bind(this);
        this.renderCardBody = this.renderCardBody.bind(this);
        this.showBio = this.showBio.bind(this);
        this.expandAllBio = this.expandAllBio.bind(this);
    }

    showBio() {
        this.setState({ showBio: !this.state.showBio })
    }
    expandAllBio()
    {
        var centerCSS = 
        {
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: "50%"
        }
        var label = this.props.defaultExpandBio === false ? "Expand All Bios" : "Minimize All Bios";
        return(<Button variant="light" style={centerCSS} onClick={e => {
            this.props.expandAllBio();
        }}>{label}</Button>)
    }

    renderCardBody() {
        var teaser = this.props.teaserList[this.state.counter];
        var userData = null;
        this.props.userDataList.forEach(user => {
            if (teaser.user.photos[0].id === user.user.photos[0].id) {
                userData = user.user;
                return;
            }

        })

        var numberLabel = this.state.counter + 1;
        numberLabel = "(" + numberLabel.toString(10) + "/" + this.props.teaserList.length.toString(10) + ") ";
        var buttonLabel = null;
        if (userData != null) {

            buttonLabel = userData.name + ", " + calculateAge(userData.birth_date) + " " + numberLabel;
            return (<Card.Body>
                <Card.Title>
                    <Button variant="success" block onClick={e => { this.showBio() }}>{buttonLabel}</Button></Card.Title>
                <Card.Text>
                    {this.state.showBio === true ? userData.bio : null}
                </Card.Text>
            </Card.Body>)
        }
        else {
            buttonLabel = "??? " + numberLabel;
            return (<Card.Body>
                <Card.Title><Button variant="outline-secondary" block disabled>{buttonLabel}</Button></Card.Title>
            </Card.Body>);
        }
    }

    renderTeaserCard() {
        if (this.props.teaserList.length > 0) {
            var cardImageStyles = {
                width: "100%",
                height: "17vw",
                objectFit: "cover"
            };

            var counter = this.state.counter;

            return (
                <div className="Teaser Card">
                    <Card border="dark" style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={this.props.teaserList[counter].user.photos[0].url}
                            style={cardImageStyles}
                            onClick={e => { this.changePhoto() }} />
                        {this.renderCardBody()}
                    </Card>
                </div>)
        }
        return null;
    }

    changePhoto() {
        if (this.state.counter === this.props.teaserList.length - 1) {
            this.setState({ counter: 0 })
        }
        else {
            this.setState({ counter: this.state.counter + 1 })
        }

        this.setState({showBio:false})
    }

    render() {
        return (
            <>
                <br></br>
                {this.renderTeaserCard()}
                <br></br>
                {this.expandAllBio()}

            </>);

    }
}

function calculateAge(birthdayString) {
    var formattedBirthdayString = birthdayString.split("T")[0];
    return moment(formattedBirthdayString, "YYYY-MM-DD").fromNow().split(" ")[0];
}


export default SidePanel;
