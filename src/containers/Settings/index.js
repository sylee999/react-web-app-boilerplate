import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from "redux";
import {
    Divider, List, ListSubheader,
} from "material-ui";
import {setAppMenu} from "../App/actions";
import AccountSetting from "./AccountSetting";
import ThemeSetting from "./ThemeSetting";

class Settings extends React.Component {
    componentWillMount() {
        this.props.actions.setAppMenu("Settings");
    }

    render() {
        return (
            <div>
                <List
                    component="nav"
                    subheader={<ListSubheader component="div">Accounts</ListSubheader>}
                >
                    <AccountSetting />
                </List>
                <Divider/>
                <List
                    component="nav"
                    subheader={<ListSubheader component="div">Appearances</ListSubheader>}
                >
                    <ThemeSetting />
                </List>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    settings: state.settings,
    session: state.session
});
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({setAppMenu}, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Settings));
