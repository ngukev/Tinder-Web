import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Button, Card, Table } from 'react-bootstrap';
import { connect } from 'react-redux';

class SettingsPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {

        if (this.props.profile != null) {
            var profile = this.props.profile;
            return <div className="Settings Panel">
                <Card border="dark" style={{ width: '23rem' }}>
                    <Card.Header >
                        <Button disabled block>Edit Preference</Button>
                    </Card.Header>
                    <Card.Body>
                        {profile.bio}
                        <br></br><br></br>
                        <Table  striped bordered size="sm">
                            <tbody>
                                <tr>
                                    <td>Age Range</td>
                                    <td>{profile.age_filter_min + "-" + profile.age_filter_max}</td>
                                </tr>
                                <tr>
                                    <td>Distance Filter</td>
                                    <td>{profile.distance_filter}</td>
                                </tr>
                                <tr>
                                    <td>School</td>
                                    <td>{profile.schools.length > 0 ? profile.schools[0].name : null}</td>
                                </tr>
                                <tr>
                                    <td>Company</td>
                                    <td>{profile.jobs.length > 0 ? profile.jobs[0].company.name : null}</td>
                                </tr>
                                <tr>
                                    <td>Occupation</td>
                                    <td>{profile.jobs.length > 0 ? profile.jobs[0].title.name : null}</td>
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