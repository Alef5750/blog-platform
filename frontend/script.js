const API_URL = "http://localhost:3000/api";
let currentUser = null;
let authToken = localStorage.getItem("authToken");

// DOM Elements
const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");
const createPostForm = document.getElementById("create-post-form");
const postsContainer = document.getElementById("posts-container");

// Navigation Links
const homeLink = document.getElementById("home-link");
const loginLink = document.getElementById("login-link");
const registerLink = document.getElementById("register-link");
const createPostLink = document.getElementById("create-post-link");
const logoutLink = document.getElementById("logout-link");

// Show/Hide Functions
function showElement(element) {
  element.classList.remove("hidden");
}

function hideElement(element) {
  element.classList.add("hidden");
}

function updateNavigation() {
  if (authToken) {
    hideElement(loginLink);
    hideElement(registerLink);
    showElement(createPostLink);
    showElement(logoutLink);
  } else {
    showElement(loginLink);
    showElement(registerLink);
    hideElement(createPostLink);
    hideElement(logoutLink);
  }
}

// Navigation Event Listeners
homeLink.addEventListener("click", (e) => {
  e.preventDefault();
  hideElement(registerForm);
  hideElement(loginForm);
  hideElement(createPostForm);
  fetchPosts();
});

loginLink.addEventListener("click", (e) => {
  e.preventDefault();
  showElement(loginForm);
  hideElement(registerForm);
  hideElement(createPostForm);
  hideElement(postsContainer);
});

registerLink.addEventListener("click", (e) => {
  e.preventDefault();
  showElement(registerForm);
  hideElement(loginForm);
  hideElement(createPostForm);
  hideElement(postsContainer);
});

createPostLink.addEventListener("click", (e) => {
  e.preventDefault();
  if (!authToken) return;
  showElement(createPostForm);
  hideElement(registerForm);
  hideElement(loginForm);
  hideElement(postsContainer);
});

logoutLink.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("authToken");
  authToken = null;
  currentUser = null;
  updateNavigation();
  fetchPosts();
});

// Form Submissions
document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const userData = {
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      profile: {
        bio: document.getElementById("bio").value,
        socialLinks: [document.getElementById("socialMedia").value],
      },
    };

    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error("Registration failed");

      document.getElementById("register-error").textContent = "";
      document.getElementById("registerForm").reset();
      showElement(loginForm);
      hideElement(registerForm);
    } catch (error) {
      document.getElementById("register-error").textContent = error.message;
    }
  });

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const loginData = {
    email: document.getElementById("loginEmail").value,
    password: document.getElementById("loginPassword").value,
  };

  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) throw new Error("Login failed");

    const data = await response.json();
    console.log(data);
    authToken = data.token;
    sessionStorage.setItem("authToken", data.token); // Store token in sessionStorage
    currentUser = data.user;

    document.getElementById("login-error").textContent = "";
    document.getElementById("loginForm").reset();
    hideElement(loginForm);
    updateNavigation();
    fetchPosts();
  } catch (error) {
    document.getElementById("login-error").textContent = error.message;
  }
});

document.getElementById("postForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!authToken) return;

  const postData = {
    title: document.getElementById("postTitle").value,
    content: document.getElementById("postContent").value,
    author: currentUser._id,
  };

  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) throw new Error("Failed to create post");

    document.getElementById("post-error").textContent = "";
    document.getElementById("postForm").reset();
    hideElement(createPostForm);
    fetchPosts();
  } catch (error) {
    document.getElementById("post-error").textContent = error.message;
  }
});

// Fetch and Display Posts
async function fetchPosts() {
  try {
    const response = await fetch(`${API_URL}/posts`);
    if (!response.ok) throw new Error("Failed to fetch posts");

    const posts = await response.json();
    displayPosts(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

function displayPosts(posts) {
  postsContainer.innerHTML = "";
  showElement(postsContainer);

  posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.className = "post-card";

    const isAuthor = currentUser && post.author._id === currentUser._id;

    postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.content}</p>
                    <small>By: ${post.author.username}</small>
                    ${
                      isAuthor
                        ? `
                        <button onclick="editPost('${post._id}')">Edit</button>
                        <button onclick="deletePost('${post._id}')">Delete</button>
                    `
                        : ""
                    }
                `;

    postsContainer.appendChild(postElement);
  });
}

// Edit and Delete Posts
async function editPost(postId) {
  // Implement edit functionality
}

async function deletePost(postId) {
  if (!authToken) return;

  try {
    const response = await fetch(`${API_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) throw new Error("Failed to delete post");

    fetchPosts();
  } catch (error) {
    console.error("Error deleting post:", error);
  }
}

// Initial setup
updateNavigation();
fetchPosts();
