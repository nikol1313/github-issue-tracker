import {state} from "./state.js";

const displayRepo = document.querySelector("#display-repo");
const displayIssue = document.querySelector("#display-issue");

export function renderRepo() {
    displayRepo.innerHTML = `
<div id="style-result">
    <h2>${state.repository.name}</h2>
    <p>${state.repository.description ?? "No description"}</p>
    <p>Owner: ${state.repository.owner.login}</p>
    <p>Stars: ${state.repository.stargazers_count}</p>
    <a href="${state.repository.html_url}" target="_blank">View on GitHub</a>
</div>
    <button type="button" id="fav-button">Favorite</button>
    `;
};

export function renderIssues(issues = state.issues) {
    displayIssue.innerHTML = issues.map(issue => `
        <article class="issue-card">
            <h3>#${issue.number} ${issue.title}</h3>
            <p>${issue.body ?? "No description"}</p>
            <span>${issue.state}</span>
            <span>@${issue.user.login}</span>
        </article>
    `).join("");
};

