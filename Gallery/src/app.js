const mainContainer = document.getElementById("root");

const handlePostClick = (e) => {
    const albumId = event.target.dataset.albumId;

    GalleryApi.getPosts(albumId)
        .then((data) => renderPosts(data, e.target))
}

const appendData = (data) => {
    for (let i = 0; i < data.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = data[i].title;
        li.classList.add("item");
        li.dataset.albumId = data[i].id;
        console.log(event);
        li.addEventListener("click", handlePostClick);
        mainContainer.appendChild(li);
    }
};

function cleanPosts() {
    const users = document.querySelectorAll(".item ul");
    for (let i = 0; i < users.length; i++) {
        if (users[i]) {
            users[i].style.display = "none";
        }
    }
}

function renderPosts(posts, target) {
    const postsList = target.childNodes[1];

    cleanPosts();

    if (postsList) {
        postsList.style.display = "block";
    } else {
        const list = document.createElement("ul");

        for (let i = 0; i < posts.length; i++) {
            let image = document.createElement("img");
            let item = document.createElement("li");
            let liTitle = document.createElement("strong");
            let liBody = document.createElement("p");

            image.src = posts[i].thumbnailUrl;
            liTitle.innerHTML = posts[i].title;

            item.appendChild(liTitle);
            item.appendChild(liBody);
            list.appendChild(item);
            item.appendChild(image);
        }

        target.appendChild(list);
    }
}

function init() {
    GalleryApi.getAlbums().then(appendData)
}

init()
