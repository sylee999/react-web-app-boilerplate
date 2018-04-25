import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from "redux";
import Event from "./Event";
import {Button} from "material-ui";
import {setAppMenu} from "../App/actions";
import {listEvents} from "./actions";

class Events extends React.Component {
    componentWillMount() {
        const { actions, session } = this.props;
        actions.setAppMenu("Events");
        if (session.user.login) {
            actions.listEvents(session.user.login);
        }
    }

    componentWillReceiveProps(nextProps) {
        const { session, actions } = this.props;
        if (session.user.login !== nextProps.session.user.login) {
            actions.listEvents(nextProps.session.user.login);
        }
    }

    render() {
        const {events, session, actions} = this.props;
        return (
            <div>
                {events.items.map((item, i) => <Event item={item} key={item.id}/>)}
                {(events.items && events.items.length > 0) &&
                    <Button variant="raised" fullWidth={true} onClick={(e) => {
                        actions.listEvents(session.user.login, events.nextPageUrl)
                    }} disabled={!events.nextPageUrl}>
                        MORE
                    </Button>
                }
            </div>
        );
    }
}

Events.propTypes = {
    session: PropTypes.object,
    events: PropTypes.object,
    actions: PropTypes.shape({
        setAppMenu: PropTypes.func,
        listEvents: PropTypes.func
    })
};

const mapStateToProps = (state, ownProps) => ({
    session: state.session,
    events: state.events
});
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({setAppMenu, listEvents, }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Events));
