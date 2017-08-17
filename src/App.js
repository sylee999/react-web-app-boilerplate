import React from 'react';
import AppBar from 'material-ui/AppBar';
import {cyan500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppNavDrawer from './AppNavDrawer';

const styles = {
    container: {
        paddingTop: 60,
    },
    appBar: {
        position: 'fixed',
        // Needed to overlap the examples
        zIndex: 1,
        top: 0,
    },
};

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: cyan500,
    },
});

class App extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            navDrawerOpen: false,
            user: null,
        };

        this.handleChangeRequestNavDrawer = this.handleChangeRequestNavDrawer.bind(this);
        this.handleChangeList = this.handleChangeList.bind(this);
    };

    componentWillMount() {
    }

    handleChangeRequestNavDrawer(open) {
        this.setState({
            navDrawerOpen: open
        });
    }

    handleChangeList(event, value) {
        this.setState({
            navDrawerOpen: false,
        });
    }

    render() {
        let docked = false;
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.container}>
                    <AppBar
                        title="Title"
                        style={styles.appBar}
                        onLeftIconButtonTouchTap={() => {
                            this.setState({
                                navDrawerOpen: !this.state.navDrawerOpen
                            });
                        }}
                    />
                    <AppNavDrawer
                        docked={docked}
                        onRequestChangeNavDrawer={this.handleChangeRequestNavDrawer}
                        onChangeList={this.handleChangeList}
                        open={this.state.navDrawerOpen}
                    />
                    <p>Hello!</p>
                    {this.props.children}
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;