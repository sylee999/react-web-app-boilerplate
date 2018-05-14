import React from 'react';
import PropTypes from 'prop-types';
import {Avatar, Card, CardHeader, CardContent, Chip, IconButton, Collapse} from "@material-ui/core";
import {ExpandMore, ExpandLess} from "@material-ui/icons";

class Event extends React.Component {
    state = { open: false };

    handleClick = () => {
        this.setState({ open: !this.state.open });
    };

    getTitle = (item) => {
        switch (item.type) {
            case "IssuesEvent":
                return item.payload.issue.title;
            case "IssueCommentEvent":
                return item.payload.comment.body.slice(0, 100) + "...";
            case "PushEvent":
                return item.payload.commits[0].message.slice(0, 100) + "...";
            case "PullRequestEvent":
                return item.payload.pull_request.title;
            default:
                return item.type;
        }
    };

    render() {
        const { item } = this.props;
        const body = JSON.stringify(item.payload, null, 4);

        return (
            <Card>
                <CardHeader
                    avatar={<Avatar>{item.type.replace("Event", '').replace(/[a-z]/g, '')}</Avatar>}
                    title={
                        <div style={{alignItems: "center", display: "flex", flexWrap: "wrap"}}>
                            <span>{this.getTitle(item)}</span>
                            <Chip avatar={<Avatar src={item.actor.avatar_url} />} style={{margin: 4}} label={item.actor.login} />
                        </div>
                    }
                    subtitle={new Date(item.created_at).toLocaleString()}
                    action={
                        <IconButton onClick={this.handleClick}>
                            {this.state.open ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                    }
                />
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <CardContent>
                        <pre>{body}</pre>
                    </CardContent>
                </Collapse>
            </Card>
        );
    }
}

Event.propTypes = {
    item: PropTypes.object.isRequired
};

export default Event;
