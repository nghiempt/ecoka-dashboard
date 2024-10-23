export const getAll = async (url: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        method: "GET"
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow" as RequestRedirect
    };

    const res = await fetch(url, requestOptions);
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
};