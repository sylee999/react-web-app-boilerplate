import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import {requestLogin} from "../redux/modules/session";

class PrivateRoute extends React.Component {
    componentWillMount() {
        this.props.actions.requestLogin();
    }

    render() {
        const { component: Component, session, ...rest } = this.props;
        return (
            <Route {...rest} render={props => (
                session && (session.isFetching || (session.user && session.user.login)) ? (
                    <Component {...props}/>
                ) : (
                    <Redirect to={{
                        pathname: "/settings",
                        state: {from: props.location}
                    }}/>
                )
            )}/>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    session: state.session,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ requestLogin }, dispatch),
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(PrivateRoute))
