const baseURL = 'http://localhost:3000/'
const instaAPI = baseURL + 'insta-media';

const $gallery = document.getElementById('gallery');
const $template = document.querySelector('#image-template').content;
const $fragment = document.createDocumentFragment();

const getInstaMedia = () => {
    fetch('./assets/data.json')
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(data => {
        data.forEach(media => {
            $template.querySelector(".image").src = media.media_url;
            $template.querySelector(".image").alt = media.media_type;

            let clone = document.importNode($template, true);
            $fragment.appendChild(clone);
        });
        $gallery.appendChild($fragment);

    })
    .catch(err => {
        console.log(err)
        let message = err.message || err.statusText || "Ocurrió un error";
        let code = err.status || '';
        $gallery.innerHTML = `<p>Error ${code}: ${message}</p>`;
    })
}

window.addEventListener('load', () => {
    getInstaMedia();
})