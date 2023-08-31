const userApi = 'https://api.github.com/users/';
const reposApi = '/repos';
const userIdElement = document.getElementById("userId");
const avatarUrlElement = document.getElementById("avatarUrl");
const companyElement = document.getElementById("company");
const blogElement = document.getElementById("blog");
const locationElement = document.getElementById("location");
const createdAtElement = document.getElementById("createdAt");
const publicReposElement = document.getElementById("publicRepos");
const publicGistsElement = document.getElementById("publicGists");
const followersElement = document.getElementById("followers");
const followingElement = document.getElementById("following");

async function getUserInfo(value) {
  
  const userInfo = await fetch(userApi + value)
  .then(response => response.json());

  const reposInfo = await fetch(userApi + value + reposApi)
  .then(response => response.json());

  createUserInfo(userInfo);
  createRepoInfo(reposInfo);
  setProfileButton(userInfo);
}

function createUserInfo(userInfo){
  
  const avatarUrl = userInfo.avatar_url;
  const company = userInfo.company;
  const blog = userInfo.blog;
  const location = userInfo.location;
  const createdAt = userInfo.created_at;
  const publicRepos = userInfo.public_repos;
  const publicGists = userInfo.public_gists;
  const followers = userInfo.followers;
  const following = userInfo.following;
  


  avatarUrlElement.src= avatarUrl;
  if(company){
    companyElement.innerHTML= "Company: " + company;
  } else {
    companyElement.innerHTML = "Company: null";
  }
  if(blog){
    blogElement.innerHTML= "Website/Blog: " + blog;
  } else {
    blogElement.innerHTML = "Website/Blog: null";
  }
  if(location){
    locationElement.innerHTML= "Location: " + location;
  } else {
    locationElement.innerHTML = "Location: null";
  }
  if(createdAt){
    createdAtElement.innerHTML= "Member Since: " + createdAt;
  } else {
    createdAtElement.innerHTML = "Member Since: null";
  }
  if(publicRepos){
    publicReposElement.innerHTML= "Public Repos: " + publicRepos;
  } else {
    publicReposElement.innerHTML = "Public Repos: 0";
  }
  if(publicGists){
    publicGistsElement.innerHTML= "Public Gists: " + publicGists;
  } else {
    publicGistsElement.innerHTML = "Public Gists: 0";
  }
  if(followers){
    followersElement.innerHTML= "Followers: " + followers;
  } else {
    followersElement.innerHTML = "Followers: 0";
  }
  if(following){
    followingElement.innerHTML= "Following: " + following;
  } else {
    followingElement.innerHTML = "Following: 0";
  }
}

function createRepoInfo(reposInfo){
  const reposContainer = document.querySelector(".reposContainer");
  for (let index = 0; index < reposInfo.length; index++) {
    const repoInfo = reposInfo[index];
    const repoName = repoInfo.name;
    const stars = repoInfo.stargazers_count;
    const watchers = repoInfo.watchers_count;
    const forks = repoInfo.forks_count;
    const newDiv = document.createElement("div");
    newDiv.className = 'repoDiv';
    const repoSpan = document.createElement("span");
    repoSpan.className = 'repoSpan'
    const starsSpan = document.createElement("span");
    starsSpan.className = 'starsSpan';
    const watchersSpan = document.createElement("span");
    watchersSpan.className = 'watchersSpan';
    const forksSpan = document.createElement("span");
    forksSpan.className = 'forksSpan';

    repoSpan.innerHTML = repoName;
    newDiv.appendChild(repoSpan);
    if(stars){
      starsSpan.innerHTML = "stars : " + stars;
      newDiv.appendChild(starsSpan);
    } else {
      starsSpan.innerHTML = "stars : " + 0;
      newDiv.appendChild(starsSpan);
    }
    if(watchers){
      watchersSpan.innerHTML = "watchers : " + watchers;
      newDiv.appendChild(watchersSpan);
    } else {
      watchersSpan.innerHTML = "watchers : " + 0;
      newDiv.appendChild(watchersSpan);
    }
    if(forks){
      forksSpan.innerHTML = "forks : " + forks;
      newDiv.appendChild(forksSpan);
    } else {
      forksSpan.innerHTML = "forks : underfined";
      newDiv.appendChild(forksSpan);
    }
    reposContainer.appendChild(newDiv);
  }
}

function setProfileButton(userInfo){
  const $hyperlink = document.querySelector('button');
  const githubLink = 'https://github.com/';
  const userId = userInfo.login;
  const newLink = 'window.open(\'' + githubLink + userId + '\');';
  $hyperlink.setAttribute('onclick', newLink);
}

// function displayBlock() {
//   const mainDiv = document.querySelector(".mainContainer");
//   const reposDiv = document.querySelector(".reposContainer");
//   mainDiv.setAttribute('style', 'visibility: visible');
//   reposDiv = setAttribute('style', 'visibility: visible');
// }

const $inputId = document.querySelector('#inputText');

$inputId.addEventListener('keyup', (e) => {
  if (e.key !== 'Enter') return;
  getUserInfo(e.target.value);
});