const API_URL = process.env.REACT_APP_API_URL

const fetchApi = async (url, body, method = `POST`) => {

    try {
        let res;

        if (body) {
            res = await fetch(API_URL + url, {
                method: method,
                credentials: `include`,
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' },
                cors: 'same-origin',
            });
        } else {
            res = await fetch(API_URL + url, {
                credentials: `include`,
                cors: 'same-origin',
            })
        }

        const ok = res.ok
        const { content, error } = await res.json()

        if (res.ok) return { content, ok }
        else return { error, ok }
    }
    catch (err) {
        return { ok: false, error: `Can't connect to the server` }
    }
}
export default fetchApi