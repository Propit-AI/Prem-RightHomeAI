import axios from 'axios';

export async function getPropertyDataFromSerpAPI(query: string) {
    const apiKey = process.env.SERP_API_KEY;
    const url = 'https://serpapi.com/search.json';

    const { data } = await axios.get(url, {
        params: {
        q: query,
        location: 'India',
        hl: 'en',
        gl: 'in',
        api_key: apiKey,
        },
    });

    const results = data.organic_results?.slice(0, 3) || [];

    return results.map((item: any) => ({
        title: item.title,
        link: item.link,
        description: item.snippet,
    }));
}
