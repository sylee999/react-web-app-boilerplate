import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from "redux";
import * as actions from './actions';
import Event from "./Event";

class Events extends React.Component {
    componentWillMount() {
        const { actions } = this.props;
        actions.setAppMenu("Events")
    }

    componentWillReceiveProps(nextProps) {
        const { session, actions } = this.props;
        if (session.user.login !== nextProps.session.user.login) {
            actions.fetchEvents(nextProps.session.user.login);
        }
    }

    render() {
        return (
            <div>
                <h2>Events</h2>
                {this.props.events.events.map((event, i) => <Event event={event} key={event.id}/>)}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    app: state.app,
    session: state.session,
    events: state.events
});
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Events));
