import { faArrowCircleRight, faRedo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Button, Table, Card } from 'react-bootstrap';
import SettingsPanel from './SettingsPanel';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TinderActions from '../actions/TinderActions';
import * as TinderConstants from '../constants/TinderConstants';

class SidePanel extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.swipeOrReload = this.swipeOrReload.bind(this);
        this.showSelectedCards = this.showSelectedCards.bind(this);
    }
    showSelectedCards() {
        return (
            <Card border="dark" style={{ width: '23rem' }}>
                <Table variant="light" striped bordered hover>
                    <thead>
                        <tr >
                            <th colSpan="2" style={{ fontSize: "24px" }}>People You Liked</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.likedList.map((user, i) => {
                            return (
                                <tr key={user.user.name + " row " + i}>
                                    <td><img src={user.user.photos[0].url} style={{width:"50px", height:"50px"}}/></td>
                                    <td>{user.user.name}</td>
                                </tr>)
                        })}
                    </tbody>
                </Table>
            </Card>)
    }
    swipeOrReload() {
        if (this.props.recommendationList.length <= TinderConstants.LIMIT) {
            this.props.TinderActions.swipeAndReload(this.props.likedList, this.props.originalRecommendationList);
        }
        else {
            this.props.TinderActions.swipeAndNext(this.props.likedList, this.props.recommendationList);
        }
    }
    render() {
        var label = this.props.defaultExpandBio === false ? "Expand All Bios" : "Minimize All Bios";
        var labelCSS = {
            fontSize: "19.4px",
            color: "white",
            fontWeight: "bold"

        };
        var playLabel = this.props.recommendationList.length > TinderConstants.LIMIT ? "Swipe and Next" : "Swipe and Reload";
        var icon = this.props.recommendationList.length > TinderConstants.LIMIT ? faArrowCircleRight : faRedo;

        var totalPages = Math.floor(this.props.originalRecommendationList.length / TinderConstants.LIMIT);
        if (this.props.originalRecommendationList.length % TinderConstants.LIMIT !== 0) {
            totalPages += 1;
        }

        var currentPage = 1;
        for (var i = this.props.recommendationList.length; i < this.props.originalRecommendationList.length; i += TinderConstants.LIMIT) {
            currentPage++;
        }

        return (
            <>
                <Table variant="dark">
                    <tbody>
                        <tr>
                            <td></td>
                            <td><Button variant="light" onClick={e => { this.props.expandAllBio(); }}>{label}</Button></td>
                        </tr>
                        <tr>
                            <td style={labelCSS}>{playLabel + " " + currentPage + "/" + totalPages}</td>
                            <td><FontAwesomeIcon icon={icon} style={{ fontSize: "40px" }} color="white" onClick={e => this.swipeOrReload()} /></td>
                        </tr>
                    </tbody>
                </Table>
                <br></br>
                {this.showSelectedCards()}
                <br></br>
                <SettingsPanel />
            </>);
    }
}

function mapStateToProps(state) {
    return {
        profile: state.TinderReducer.profile,
        recommendationList: state.TinderReducer.recommendationList,
        teaserList: state.TinderReducer.teaserList,
        originalRecommendationList: state.TinderReducer.originalRecommendationList,
        likedList: state.TinderReducer.likedList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        TinderActions: bindActionCreators(TinderActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);