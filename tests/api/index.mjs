export const NAME = "Unit Test: API";
export const CODE_NAME = "api";

export const DEMO_ACCOUNT_ID = "655bf70f3ee93eb2c723dc9d";
export const fetchInternalAPI = async (method, path, body) => {
    const res = await fetch(`http://127.0.0.1:3001/api/${path}`, {
        body: JSON.stringify(body),
        method: method.toUpperCase(),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return await res.json();
}