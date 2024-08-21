function handleScroll() {
    showContent();
    resizeTopbar();
}

function showContent() {
    document.getElementById('hidden-container').classList.remove('hidden');
}

// IE shenanigans, apparently
const documentEl = document.documentElement.clientHeight ? document.documentElement : document.body;

function resizeTopbar() {
    if(documentEl.scrollTop === 0) {
        document.getElementById('topbar').classList.remove('topbar-scrolled');
    }
    else {
        document.getElementById('topbar').classList.add('topbar-scrolled');
    }
}