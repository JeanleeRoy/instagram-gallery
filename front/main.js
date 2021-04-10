const baseURL = 'http://localhost:3000/'
const instaAPI = baseURL + 'insta-media';

const $gallery = document.getElementById('gallery');

const getInstaMedia = () => {
    fetch(instaAPI)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json => {
        console.log(json);
    })
    .catch(err => {
        let message = err.message || err.statusText || "Ocurrió un error";
        let code = err.status || '';
        $gallery.innerHTML = `<p>Error ${code}: ${message}</p>`;
    })
}

window.addEventListener('load', () => {
    getInstaMedia();
})