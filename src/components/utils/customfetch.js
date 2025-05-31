export const customfetch = (url,fetch_method,req_body, onSuccess, onError) => {
    //${import.meta.env.VITE_BASE_SERVER_URL}
    fetch(`localhost:3000/${url}`, {
        headers: {
            "Content-type": 'application/json'
        },
        method: `${fetch_method}`,
        body: JSON.stringify(req_body)
    })
        .then(async res => {
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message?? "Hubo un error inesperado");
            }

            return res.json();
        })
        .then(onSuccess)
        .catch(onError)
}