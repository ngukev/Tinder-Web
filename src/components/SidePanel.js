import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Card } from 'react-bootstrap';


class SidePanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        };
        this.changePhoto = this.changePhoto.bind(this);
        this.renderTeaserCard = this.renderTeaserCard.bind(this);
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
                        <Card.Body>
                            <Card.Title>???</Card.Title>
                        </Card.Body>
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
    }

    render() {
        return (
            <>
                <br></br>
                {this.renderTeaserCard()}
            </>);

    }
}



export default SidePanel;
