import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from "redux";
import * as actions from './actions';

class Setting extends React.PureComponent {
    constructor(props, context) {
        super(props, context);
    }
    componentWillMount() {
        const { actions } = this.props;
        actions.changeAppMenu("Setting")
    }

    render() {
        return (
            <div>
                <h2>Setting</h2>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Setting));
