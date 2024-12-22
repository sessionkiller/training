type CacheEntry = {
  data: any;
  expiry: number;
};

const cache: { [key: string]: CacheEntry } = {};
const CACHE_TTL = 3_600_000; // Cache Time-To-Live: 1 hour

export const cacheFetch = async (
  url: string,
  options?: RequestInit
): Promise<any> => {
  const now = Date.now();

  if (cache[url] && cache[url].expiry > now) {
    console.log("Returning cached data for:", url);
    return Promise.resolve(cache[url].data);
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);

    const data = await response.json();
    cache[url] = { data, expiry: now + CACHE_TTL }; // Store response with expiry
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
