function toggleSidebarLeft() {
    document.getElementById("__layout").classList.toggle("left-collapsed")
    document.getElementById("__toggle-left-button").classList.toggle("turned")
}

function toggleSidebarRight() {
    document.getElementById("__layout").classList.toggle("right-collapsed")
    document.getElementById("__toggle-right-button").classList.toggle("turned")
}

window.addEventListener('load', loadArticle);

function loadArticle() {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if(this.readyState !== 4) return;
        switch (this.status) {
            case 200:
                handleArticle(JSON.parse(this.responseText));
                break;
            case 206:
                window.location.href = this.headers.get("location");
                break;
            default: 
                window.location.href = "/error?code=" + this.status;
                break;
        }
    }
    const articlePath = window.location.pathname.substring("/wiki".length);
    request.open("GET", "/api/article/" + articlePath, true);
    request.send();
}

function handleArticle(article) {
    document.getElementById("__content-container").innerHTML = article.content;
}