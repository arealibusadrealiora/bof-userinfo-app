interface User {
    html_url: string;
    avatar_url: string;
    login: string;
    site_admin: boolean;
    repos_url: string;
    email: string;
    repos_amount: number;
}

interface UserRepo {
    full_name: string;
    language: string;
    html_url: string;
}

interface UserFollower {
    login: string;
    html_url: string;
    avatar_url: string;
}

interface ErrorMsg {
    documentation_url: string;
    message: string;
}

const user_list = document.querySelector("ul")
const user_input = document.querySelector("input")
const user_section = document.querySelector("section")

const fetchUsers = () => {
    fetch("https://api.github.com/users").then(
        data => data.json()
    ).then(
        (data: User[]) => createList(data)
    ).catch((e) => {
        console.log(e)
    })
}

const fetchUserRepos = (user_login: string) => {
    fetch(`https://api.github.com/users/${user_login}/repos`).then(
        data => data.json()
    ).then(
        (data: UserRepo[]) => UserRepos(data)
    ).catch((e) => {
        console.log(e)
    })
}

const fetchUserFollowers = (user_login: string) => {
    fetch(`https://api.github.com/users/${user_login}/followers`).then(
        data => data.json()
    ).then(
        (data: UserFollower[]) => UserFollowers(data)
    ).catch((e) => {
        console.log(e)
    })
}

const createList = (users: User[]) => {
    const ul_users = document.createElement("ul")
    ul_users.innerText = "GitHub users:"
    users.forEach((element) => {
        const li_users = document.createElement("li")
            li_users.innerHTML = `<img src=${element.avatar_url} width="50" height="50"> <a href=${element.html_url}>${element.login}</a>`
            ul_users.appendChild(li_users)
    })
user_section.appendChild(ul_users)
}

const searchUser = () => {
    const user = user_input.value
    if (user) {
        fetch(`https://api.github.com/users/${user}`)
            .then(
                data => data.json()
            )
            .then(
               (data: User) => {
                    showUser(data)
               }
            )
            .catch((e) => {
                console.log("Error! ", e)
            })
    } else {
        alert("«User» can't be empty. Please check the field and try again.")
    }
}

const UserRepos = (repos: UserRepo[]) => {
    const ul_repo = document.createElement("ul")
        ul_repo.innerText = "User repositories:"
    repos.forEach((element) => {
        const li_repo = document.createElement("li")
            li_repo.innerHTML = `<a href=${element.html_url}>${element.full_name} (${element.language})</a>`
            ul_repo.appendChild(li_repo)
    })
    user_section.appendChild(ul_repo)
}

const UserFollowers = (followers: UserFollower[]) => {
    const ul_follower = document.createElement("ul")
        ul_follower.innerText = "User followers:"
    followers.forEach((element) => {
        const li_follower = document.createElement("li")
            li_follower.innerHTML = `<img src=${element.avatar_url} width="50" height="50"> <a href=${element.html_url}>${element.login}</a>`
            ul_follower.appendChild(li_follower)
    })
    user_section.appendChild(ul_follower)
}

const showUser = (user: User) => {
    const avatar = document.createElement("img")
        avatar.src = user.avatar_url
        avatar.height = 200
        avatar.width = 200
    const username = document.createElement("p")
        username.innerText = `Username: ${user.login}`
    const link = document.createElement("a")
        link.innerHTML = `GitHub link: <a href=${user.html_url}>${user.html_url}</a>`
    user_section.innerHTML = ""
    user_section.appendChild(avatar)
    user_section.appendChild(username)
    user_section.appendChild(link)
    fetchUserRepos(user.login)
    fetchUserFollowers(user.login)
}