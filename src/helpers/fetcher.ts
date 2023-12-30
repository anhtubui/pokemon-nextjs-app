async function fetcher<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error("Error fetching the data");
    }
    return res.json();
}

export default fetcher;
