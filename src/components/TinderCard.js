import React from 'react';
import { Button, Card, FormCheck } from 'react-bootstrap';
import '../css/app.css';

class TinderCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter:0
        };
        this.changePhotos = this.changePhotos.bind(this);
    }

    changePhotos()
    {
        console.log(this.state.counter,this.props.user.user.photos.length);
        if(this.state.counter === this.props.user.user.photos.length-1)
        {
            this.setState({counter: 0})
        }
        else
        {
            this.setState({counter: this.state.counter + 1})
        }
    }
    render() {
        var user = this.props.user;
        var currentCounter = this.state.counter;
        return (
            <div className="TinderCard">
                <Card style={{ width: '15rem' }} key={user.user._id}>
                    <Card.Img variant="top" src={user.user.photos[currentCounter].url} onClick={e => this.changePhotos()} />
                    <Card.Body>
                        <Card.Title>{user.user.name}</Card.Title>
                        <Card.Text>
                            <Button></Button>
                            {/* {user.user.bio} */}
                        </Card.Text>
                        <FormCheck label={"Like"}></FormCheck>
                        <Button variant="primary">Super Like</Button>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default TinderCard;