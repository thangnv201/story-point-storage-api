import { storage } from '@forge/api';

export async function issueCreationTrigger(event, context) {
    if (event.changelog.items === undefined) {
        return false;
    }
    if (event.changelog.items.filter(e => e.field === 'Story Points').length === 0) {
        return false;
    }
    let storyPoint = event.changelog.items.filter(e => e.field === 'Story Points')[0].toString;
    let body = {
        "issueKey": event.issue.key,
        "storyPoint": parseInt(storyPoint)
    }
    console.log(body);
    storage.set("issue-key-"+body.issueKey,body);
    console.log(await storage.get("issue-key-"+body.issueKey));
    return true;
}