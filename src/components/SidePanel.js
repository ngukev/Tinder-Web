import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
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

        if(this.props.likedList.length > 0)
        {
            return (
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
                                    <td><img src={user.user.photos[0].url} alt="" style={{width:"50px", height:"50px"}}/></td>
                                    <td>{user.user.name}</td>
                                </tr>)
                        })}
                    </tbody>
                </Table>)
        }
        return null;
    }
    swipeOrReload() {
        if (this.props.recommendationList.length <= TinderConstants.LIMIT) {
            this.props.TinderActions.swipeAndReload(this.props.likedList, this.props.originalRecommendationList,this.props.xAuthToken);
        }
        else {
            this.props.TinderActions.swipeAndNext(this.props.likedList, this.props.recommendationList,this.props.xAuthToken);
        }
    }
    render() {
        return (
            <>
                <Table variant="dark">
                    <thead>
                    <tr>
                        <td><Button variant="primary" onClick={e => this.swipeOrReload()} size="lg" block>Swipe</Button></td>
                    </tr>
                    </thead>
                </Table>
                <br></br>
                {this.showSelectedCards()}
            </>);
    }
}

function mapStateToProps(state) {
    return {
        profile: state.TinderReducer.profile,
        recommendationList: state.TinderReducer.recommendationList,
        teaserList: state.TinderReducer.teaserList,
        originalRecommendationList: state.TinderReducer.originalRecommendationList,
        likedList: state.TinderReducer.likedList,
        xAuthToken: state.MetaDataReducer.xAuthToken
    };
}

function mapDispatchToProps(dispatch) {
    return {
        TinderActions: bindActionCreators(TinderActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);