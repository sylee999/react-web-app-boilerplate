import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => (
            rest.session && rest.session.user && rest.session.user.login ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{
                    pathname: "/settings",
                    state: { from: props.location }
                }}/>
            )
        )}/>
    );
};

export default PrivateRoute;