export class HttpService {

    _handleError(response) {
        if (!response.ok)
            throw new Error(response.statusText);

        return response;
    }

    get(url) {
        return fetch(url)
            .then(res => this._handleError(res))
            .then(res => res.json());
    }
}