import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar} from "material-ui";
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
                            fullWidth
                            modal={false}
                            onClose={() => {actions.notifyMessage({status: STATUS_CLEAR})}}
                        >
                            <DialogTitle>Error!!</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    {notification.message}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button color="primary" onClick={() => {actions.notifyMessage({status: STATUS_CLEAR})}} autoFocus>
                                    Close
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Snackbar
                            open={notification.status === STATUS_SUCCESS}
                            autoHideDuration={2000}
                            message={notification.message || "SUCCESS!"}
                            onClose={() => {actions.notifyMessage({status: STATUS_CLEAR})}}
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
