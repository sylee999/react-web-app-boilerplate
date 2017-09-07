import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from "redux";
import * as actions from './actions';

class Event extends React.PureComponent {
    componentWillMount() {
        const { actions } = this.props;
        actions.changeAppMenu("Event")
    }

    render() {
        return (
            <div>
                <h2>Event</h2>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => ({
    app: state.app
});
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Event));
