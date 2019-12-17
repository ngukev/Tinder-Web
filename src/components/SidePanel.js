import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import SettingsPanel from './SettingsPanel';

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
                            <td style={labelCSS}>Swipe and Next</td>
                            <td><FontAwesomeIcon icon={faPlayCircle} style={{ fontSize: "40px" }} color="white" onClick={e => { console.log("clicked btich") }} /></td>
                        </tr>
                    </tbody>
                </Table>
                <br></br>
                <SettingsPanel />
            </>);
    }
}

export default SidePanel;
