// src/utils/fetcher.ts

/**
 * A utility function to fetch data from a given URL.
 * @param url The URL from which to fetch data.
 * @returns A Promise resolving to the JSON data.
 */
async function fetcher<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
}

export { fetcher };
