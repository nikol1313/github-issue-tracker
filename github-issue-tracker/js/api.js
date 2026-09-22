// fetch repository
export async function fetchRepo(owner, repository) {
    try {
        const repo = await fetch(`https://api.github.com/repos/${owner}/${repository}`);
        if (!repo.ok) {
            throw new Error(`HTTP error! Status: ${repo.status}`);
         }
    
        const data = await repo.json();
        return data

    } catch (error) {
        console.error("Fetch failed")
    }
};


// fetch issue
export async function fetchIssues(owner, repository) {
    try {
        const issue = await fetch(`https://api.github.com/repos/${owner}/${repository}/issues`);
        if (!issue.ok) {
            throw new Error(`HTTP error! Status: ${issue.status}`);
        };
        const data = await issue.json();
        return data
    } catch (error) {
        console.error("Fetch failed");
    }
};


