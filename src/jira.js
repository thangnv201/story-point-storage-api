import { storage,properties  } from '@forge/api';

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
    await properties.onJiraIssue(event.issue.key).set('testing',"HEL-7"+ body.storyPoint);
    let data = await properties.onJiraIssue(event.issue.key).get('testing');
    console.log(data);
    return true;
}