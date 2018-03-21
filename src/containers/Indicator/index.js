import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import {Dialog, FlatButton, LinearProgress, Snackbar} from "material-ui";
import {TASK_START, TASK_SUCCESS, TASK_ERROR, TASK_CLEAR, ACTION_KEY} from "./reducer";
import {notifyMessage} from "./actions";

class Indicator extends Component {
    render() {
        const { actions, indicator, } = this.props;
        return (
            <div>
                {indicator.pendingTask > 0 &&
                <LinearProgress mode="indeterminate"/>
                }
                {!!indicator.notification &&
                    <div>
                        <Dialog
                            open={(indicator.notification.status === TASK_ERROR)}
                            title="Error!!"
                            actions={<FlatButton label="Close" primary={true} onClick={() => {actions.notifyMessage({status: "DONE", message:""})}}/>}
                            modal={false}
                            onRequestClose={() => {actions.notifyMessage({status: TASK_CLEAR})}}
                        >
                            {indicator.notification.message}
                        </Dialog>
                        <Snackbar
                            open={indicator.notification.status === TASK_SUCCESS}
                            autoHideDuration={2000}
                            message={indicator.notification.message || "SUCCESS!"}
                            onRequestClose={() => {actions.notifyMessage({status: TASK_CLEAR})}}
                        />
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    indicator: state.indicator,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ notifyMessage }, dispatch),
    dispatch
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Indicator))
