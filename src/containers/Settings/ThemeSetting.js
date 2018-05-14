import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    ListItem, ListItemIcon, FormControlLabel, Switch
} from "@material-ui/core";
import {ColorLens} from '@material-ui/icons';
import {saveDarkMode} from "./actions";

const ThemeSetting = ({darkMode, actions}) => {
    this.handleDarkModeToggle = (e, isInputChecked) => {
        actions.saveDarkMode(isInputChecked);
    };

    return (
        <ListItem>
            <ListItemIcon>
                <ColorLens/>
            </ListItemIcon>
            <FormControlLabel
                control={
                    <Switch
                        checked={darkMode}
                        onChange={this.handleDarkModeToggle}
                    />
                }
                label="Dark mode"
            />
        </ListItem>
    );
};

const mapStateToProps = (state, ownProps) => ({
    darkMode: state.settings.darkMode,
});
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({saveDarkMode}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSetting);
