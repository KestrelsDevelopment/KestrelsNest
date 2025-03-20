loadArticle();
navigate(null, "", window.location.href + "/abc");

async function loadArticle() {
    let articlePath = window.location.pathname.substring("/wiki".length);

    try {
        let response = await fetch("/api/wiki/article" + articlePath);
        handleResponse(response);
    } catch (error) {
        console.error("Failed to fetch article:", error);
    }
}

async function handleResponse(response) {
    if (response.status === 200) {
        try {
            let article = await response.json();
            handleArticle(article);
        } catch (err) {
            console.error("Invalid JSON response while fetching article:", err);
        }
    } else if (response.status === 206) {
        navigate(null, "", response.headers.get("Location"));
    } else {
        // window.location.href = "/error?code=" + response.status;
        console.error("Unexpected response status:", response.status);
    }
}

function handleArticle(article) {
    let container = document.getElementById("__content-container");
    if (container) {
        container.innerHTML = sanitizeHTML(article.content);
    }
}

function sanitizeHTML(html) {
    let doc = new DOMParser().parseFromString(html, "text/html");

    doc.querySelectorAll("script").forEach((script) => script.remove());
    // doc.querySelectorAll("a").forEach((link) => {
    //     link.addEventListener("click", onWikiNavigate);
    // });

    return doc.body.innerHTML;
}
