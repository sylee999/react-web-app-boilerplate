import React from 'react';
import {Avatar, Card, CardHeader, CardText, Chip} from "material-ui";

const Event = ({item}) => {
    const getTitle = (item) => {
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
    const body = JSON.stringify(item.payload, null, 4);

    return (
        <Card initiallyExpanded={false}>
            <CardHeader
                avatar={<Avatar>{item.type.replace("Event", '').replace(/[a-z]/g, '')}</Avatar>}
                title={
                    <div style={{alignItems: "center", display: "flex", flexWrap: "wrap"}}>
                        <span>{getTitle(item)}</span>
                        <Chip style={{margin: 4}}><Avatar src={item.actor.avatar_url} /> {item.actor.login}</Chip>
                    </div>
                }
                subtitle={new Date(item.created_at).toLocaleString()}
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
