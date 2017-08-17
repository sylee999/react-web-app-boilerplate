import React from 'react';
import { Link } from 'react-router-dom'
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import {spacing, typography} from 'material-ui/styles';
import {cyan500} from 'material-ui/styles/colors';

const styles = {
    logo: {
        cursor: 'pointer',
        fontSize: 24,
        color: typography.textFullWhite,
        lineHeight: `${spacing.desktopKeylineIncrement}px`,
        fontWeight: typography.fontWeightLight,
        backgroundColor: cyan500,
        paddingLeft: spacing.desktopGutter,
        marginBottom: 8,
    },
};

class AppNavDrawer extends React.Component {
    constructor() {
        super();

        this.onChangeList = this.onChangeList.bind(this);
    }

    onChangeList(event, value) {
        this.props.onChangeList(event, value);
    }

    render() {
        return (
            <Drawer
                docked={this.props.docked}
                open={this.props.open}
                onRequestChange={this.props.onRequestChangeNavDrawer}
            >
                {/*<div style={styles.logo}>*/}
                    {/*Menu*/}
                {/*</div>*/}
                <AppBar title="Menu"/>
                <MenuItem><Link to='GithubActivity'>Github Activity</Link></MenuItem>
                <MenuItem><Link to='IterationPlan'>Iteration Plan</Link></MenuItem>
                {/*<MenuItem><Link to='GithubStatistics'>Github Statistics</Link></MenuItem>*/}
                <MenuItem><Link to='Setting'>Setting</Link></MenuItem>
            </Drawer>
        );
    }
}

export default AppNavDrawer;