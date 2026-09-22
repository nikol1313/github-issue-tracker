import {fetchRepo , fetchIssues} from "./api.js"
import { state } from "./state.js";
import { renderRepo, renderIssues } from "./ui.js";

const repoForm = document.querySelector("#repo-form");
const repoInput = document.querySelector("#repo-input");

// listen to form and call functions with users desired input.
repoForm.addEventListener("submit", async (foo) => {
    foo.preventDefault();
    const repoValue = repoInput.value.trim();
    const [owner, repo] = repoValue.split("/");

    const repos = await fetchRepo(owner, repo);
    state.repository = repos;
    const issues = await fetchIssues(owner, repo);
    state.issues = issues;

    renderRepo();
    renderIssues();
    repoInput.value = "";
});

// listen to issue input and filter
const issueInput = document.querySelector("#issue-input");
const status = document.querySelectorAll('input[name="status"]');

function filterIssues() {
    const input = issueInput.value.trim().toLowerCase();

    let filteredIssues = state.issues;

    // filter status
    if (state.filter !== "all") {
        filteredIssues = filteredIssues.filter(issue =>
            issue.state === state.filter
        );
    }

    // filter search
    if (input) {
        filteredIssues = filteredIssues.filter(issue =>
            issue.title.toLowerCase().includes(input)
        );
    }

    renderIssues(filteredIssues);
}

issueInput.addEventListener("input", () => {
    filterIssues();
});

status.forEach(radio => {
    radio.addEventListener("change", (event) => {
        state.filter = event.target.value;
        filterIssues();
    });
});