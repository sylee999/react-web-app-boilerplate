import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { Snackbar} from "material-ui";

class Notification extends React.Component {
    render() {
        const { actions, settings, } = this.props;
        return (
            <div>
                <Snackbar
                    open={app.notification.status === "SUCCESS"}
                    autoHideDuration={2000}
                    message={app.notification.message}
                    onRequestClose={() => {actions.notifyMessage({status: "DONE", message:""})}}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    session: state.session,
    settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({  }, dispatch),
    dispatch
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Notification))
