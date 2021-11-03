class GalleryApi {
    static BASE_URL = 'https://jsonplaceholder.typicode.com'

    static request(uri, method, body) {
        return fetch(`${this.BASE_URL}/${uri}`, {
            method,
            body
        })
            .then(res => res.json())
            .catch(e => console.error(e))
    }

    static getAlbums() {
        return this.request('albums')
    }

    static getPosts(albumId) {
        return this.request(`albums/${albumId}/photos`)
    }
}
