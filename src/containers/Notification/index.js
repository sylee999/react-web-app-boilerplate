import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import {Dialog, FlatButton, Snackbar} from "material-ui";
import {STATUS_SUCCESS, STATUS_ERROR, STATUS_CLEAR, notifyMessage} from "./actions";

class Notification extends Component {
    render() {
        const { actions, notification, } = this.props;
        return (
            <div>
                {!!notification &&
                    <div>
                        <Dialog
                            open={(notification.status === STATUS_ERROR)}
                            title="Error!!"
                            actions={<FlatButton label="Close" primary={true} onClick={() => {actions.notifyMessage({status: STATUS_CLEAR})}}/>}
                            modal={false}
                            onRequestClose={() => {actions.notifyMessage({status: STATUS_CLEAR})}}
                        >
                            {notification.message}
                        </Dialog>
                        <Snackbar
                            open={notification.status === STATUS_SUCCESS}
                            autoHideDuration={2000}
                            message={notification.message || "SUCCESS!"}
                            onRequestClose={() => {actions.notifyMessage({status: STATUS_CLEAR})}}
                        />
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    notification: state.notification,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({ notifyMessage }, dispatch),
    dispatch
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Notification))
