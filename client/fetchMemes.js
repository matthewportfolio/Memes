class Meme {
    constructor({ data }) {
        this.subreddit = data.subreddit;
        this.author = data.author;
        this.title = data.title;
        this.upvotes = data.ups;
        this.downvotes = data.downs;
        this.createdAt = data.created_utc;
        this.id = data.id;
        this.image = {
            url: data.url,
            height: data.preview.images[0].source.height,
            width: data.preview.images[0].source.width
        };
    }
}

const url = 'https://www.reddit.com/r';
const subreddits = process.env.SUBREDDITS.split(/ +/);
const fetch = require('node-fetch');

module.exports = async (limit = 100) => {

    const data = await Promise.all(subreddits.map(sub => fetch(`${url}/${sub}.json?limit=${limit}`).then(res => res.json())));
    const memes = data
        .map(d => d.data.children)
        .flat()
        .filter(c => c.data.url.endsWith('png') || c.data.url.endsWith('jpg'))
        .map(child => new Meme(child));
        
    return memes;

};