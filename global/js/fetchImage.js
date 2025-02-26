document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("img[data-src]").forEach(addApiSrc);
});

function addApiSrc(imgElem) {
    let originalSrc = imgElem.getAttribute("data-src");
    let name = originalSrc.split('/').pop();

    let styles = getComputedStyle(imgElem);
    let vertical = imgElem.getAttribute('data-vertical') === 'true';
    let size = vertical ? styles.height : styles.width;

    size = size.endsWith('px') ? parseInt(size) : 0;
    size = isNaN(size) || size <= 0 ? 0 : size;

    let onError = () => {
        imgElem.setAttribute('src', originalSrc);
        imgElem.removeEventListener('error', onError);
    }

    let onLoad = () => {
        imgElem.removeEventListener('error', onError);
        imgElem.removeEventListener('load', onLoad);
    }

    if (size > 0) {
        imgElem.setAttribute('src', `/api/content/${name}?size=${size}`);
        imgElem.addEventListener('error', onError);
        imgElem.addEventListener('load', onLoad);
    }
}
