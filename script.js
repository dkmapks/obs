document.addEventListener("DOMContentLoaded", () => {
    const users = [];
    let isModMenuVisible = false;

    const registerForm = document.getElementById("registerForm");
    const usernameInput = document.getElementById("username");
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");
    const usersDisplay = document.getElementById("usersDisplay");
    const usersList = document.getElementById("users");
    const modMenu = document.getElementById("modMenu");

    // Rank colors and thresholds
    const ranks = [
        { name: "King", min: 1, max: 10, class: "rank-king" },
        { name: "Boss", min: 11, max: 100, class: "rank-boss" },
        { name: "Master", min: 101, max: 500, class: "rank-master" },
        { name: "Legend", min: 501, max: 1000, class: "rank-legend" },
        { name: "God", min: 1001, max: Infinity, class: "rank-god" }
    ];

    // Handle registration
    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = usernameInput.value.trim();
        if (username) {
            users.push({ username, likes: 0, followers: 0 });
            usernameInput.value = "";
            updateUsersDisplay();
        }
    });

    // Update user list
    function updateUsersDisplay() {
        usersDisplay.style.display = "block";
        usersList.innerHTML = "";
        users.forEach((user, index) => {
            const rank = getRank(user.followers);
            const li = document.createElement("li");
            li.innerHTML = `${user.username} - Likes: ${user.likes}, Followers: ${user.followers} <span class="${rank.class}">${rank.name}</span>`;
            const likeButton = document.createElement("button");
            likeButton.textContent = "Like";
            likeButton.addEventListener("click", () => {
                user.likes++;
                updateUsersDisplay();
            });
            const followButton = document.createElement("button");
            followButton.textContent = "Follow";
            followButton.addEventListener("click", () => {
                user.followers++;
                updateUsersDisplay();
            });
            li.appendChild(likeButton);
            li.appendChild(followButton);
            usersList.appendChild(li);
        });
    }

    // Get rank based on followers
    function getRank(followers) {
        return ranks.find(rank => followers >= rank.min && followers <= rank.max);
    }

    // Search users
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        searchResults.innerHTML = "";
        users.filter(user => user.username.toLowerCase().includes(query)).forEach(user => {
            const rank = getRank(user.followers);
            const li = document.createElement("li");
            li.innerHTML = `${user.username} - Followers: ${user.followers} <span class="${rank.class}">${rank.name}</span>`;
            searchResults.appendChild(li);
        });
    });

    // Mod menu activation
    document.addEventListener("keydown", (event) => {
        if (event.code === "Digit7" && event.shiftKey) {
            const code = prompt("Enter mod menu code:");
            if (code === "7432") {
                isModMenuVisible = true;
                modMenu.style.display = "block";
            } else {
                alert("Invalid code.");
            }
        }
    });

    // Mod menu functionality
    document.getElementById("addCustomLikes").addEventListener("click", () => {
        const username = prompt("Enter username to add likes:");
        const likesToAdd = parseInt(prompt("Enter number of likes to add:"), 10);
        const user = users.find(user => user.username === username);
        if (user && !isNaN(likesToAdd)) {
            user.likes += likesToAdd;
            updateUsersDisplay();
        }
    });

    document.getElementById("addCustomFollowers").addEventListener("click", () => {
        const username = prompt("Enter username to add followers:");
        const followersToAdd = parseInt(prompt("Enter number of followers to add:"), 10);
        const user = users.find(user => user.username === username);
        if (user && !isNaN(followersToAdd)) {
            user.followers += followersToAdd;
            updateUsersDisplay();
        }
    });
});
