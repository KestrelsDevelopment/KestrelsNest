document.body.addEventListener("click", onWikiNavigate);

function navigate(url) {
    let oldUrl = window.location.origin + window.location.pathname;
    history.pushState(null, "", url);
    let newUrl = window.location.origin + window.location.pathname;
    onNavigate(oldUrl, newUrl);
}

function onNavigate(oldUrl, newUrl) {
    if (newUrl !== oldUrl) loadArticle();
}

function onWikiNavigate(event) {
    if (event.target.tagName !== "A") return;
    event.preventDefault();
    if (event.target.href.startsWith(window.location.origin + "/wiki/")) {
        navigate(event.target.href);
    }
}
