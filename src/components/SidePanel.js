import { faPlayCircle,faRedo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import SettingsPanel from './SettingsPanel';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as TinderActions from '../actions/TinderActions';

class SidePanel extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        var label = this.props.defaultExpandBio === false ? "Expand All Bios" : "Minimize All Bios";
        var labelCSS = {
            fontSize: "24px",
            color:"white"
        };
        var playLabel = this.props.recommendationList.length > 8 ? "Swipe and Next" : "Swipe and Reload";
        var icon = this.props.recommendationList.length > 8 ? faPlayCircle : faRedo;
        return (
            <>
                <br></br>
                <Table>
                    <tbody>
                        <tr>
                            <td><Button variant="light" onClick={e => { this.props.expandAllBio(); }}>{label}</Button></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td style={labelCSS}>{playLabel}</td>
                            <td><FontAwesomeIcon icon={icon} style={{ fontSize: "40px" }} color="white" onClick={e => this.props.TinderActions.swipeAndNext(this.props.recommendationList)} /></td>
                        </tr>
                    </tbody>
                </Table>
                <br></br>
                <SettingsPanel />
            </>);
    }
}

function mapStateToProps(state) {
    return { profile: state.TinderReducer.profile,
             recommendationList: state.TinderReducer.recommendationList };
}

function mapDispatchToProps(dispatch)
{
  return{
    TinderActions : bindActionCreators(TinderActions,dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);