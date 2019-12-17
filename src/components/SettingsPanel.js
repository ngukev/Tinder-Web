import { faTools } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Card, Table } from 'react-bootstrap';
import { connect } from 'react-redux';

class SettingsPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        if (this.props.profile != null) {
            var stylesCSS =
            {
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                width: "60%",
                fontWeight: "bold",
                fontSize: "24px"
            }
            var profile = this.props.profile;
            return <div className="Settings Panel">
                <Card border="dark" style={{ width: '23rem' }}>
                    <Card.Header >
                        <FontAwesomeIcon icon={faTools} />
                        <h1 style={stylesCSS}>Preferences</h1>
                    </Card.Header>
                    <Card.Body>
                        {profile.user.bio}
                        <br></br><br></br>
                        <Table striped bordered size="sm">
                            <tbody>
                                <tr>
                                    <td>Likes Remaining</td>
                                    <td>{profile.likes.likes_remaining}</td>
                                </tr>
                                <tr>
                                    <td>Super Likes</td>
                                    <td>{profile.super_likes.remaining}</td>
                                </tr>
                                <tr>
                                    <td>Age Range</td>
                                    <td>{profile.user.age_filter_min + "-" + profile.user.age_filter_max}</td>
                                </tr>
                                <tr>
                                    <td>Distance Filter</td>
                                    <td>{profile.user.distance_filter}</td>
                                </tr>
                                <tr>
                                    <td>School</td>
                                    <td>{profile.user.schools.length > 0 ? profile.user.schools[0].name : null}</td>
                                </tr>
                                <tr>
                                    <td>Company</td>
                                    <td>{profile.user.jobs.length > 0 ? profile.user.jobs[0].company.name : null}</td>
                                </tr>
                                <tr>
                                    <td>Occupation</td>
                                    <td>{profile.user.jobs.length > 0 ? profile.user.jobs[0].title.name : null}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <Card.Footer>
                        </Card.Footer>
                    </Card.Body>
                </Card>
            </div>
        }
        return null;
    }
}

function mapStateToProps(state) {
    return { profile: state.TinderReducer.profile };
}

function mapDispatchToProps(dispatch) {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPanel);