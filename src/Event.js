import React from 'react';
import {Avatar, Card, CardHeader, CardText, Chip} from "material-ui";

const Event = ({event}) => {
    const getTitle = (event) => {
        switch (event.type) {
            case "IssuesEvent":
                return event.payload.issue.title;
            case "IssueCommentEvent":
                return event.payload.comment.body.slice(0, 100) + "...";
            case "PushEvent":
                return event.payload.commits[0].message.slice(0, 100) + "...";
            case "PullRequestEvent":
                return event.payload.pull_request.title;
            default:
                return event.payload.title;
        }
    };
    const body = JSON.stringify(event.payload, null, 4);

    return (
        <Card initiallyExpanded={false}>
            <CardHeader
                avatar={<Avatar>{event.type.replace("Event", '').replace(/[a-z]/g, '')}</Avatar>}
                title={
                    <div style={{alignItems: "center", display: "flex", flexWrap: "wrap"}}>
                        <span>{getTitle(event)}</span>
                        <Chip style={{margin: 4}}><Avatar src={event.actor.avatar_url} /> {event.actor.login}</Chip>
                    </div>
                }
                subtitle={new Date(event.created_at).toLocaleString()}
                showExpandableButton={true}
            />
            <CardText
                expandable={true}>
                <pre>{body}</pre>
            </CardText>
        </Card>
    );
};

export default Event;
