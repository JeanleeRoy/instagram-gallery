const axios = require('axios')

// API Doc: https://developers.facebook.com/docs/instagram-basic-display-api/reference/media#fields

const baseURL = 'https://graph.instagram.com/me';

const instaApi = (token = null, callback, errorcallback) => {
    axios.get(baseURL + '/media', {
        params: {
            fields: 'id,caption,media_url,media_type,permalink',
            access_token: token
        }
    }).then(res => {
        if(callback != null) callback(res);
    }).catch(err => {
        if(errorcallback != null) errorcallback(err);
    })
}

module.exports = instaApi;