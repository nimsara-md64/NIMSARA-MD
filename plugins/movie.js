const { cmd } = require('../command');
const { fetchJson } = require('../lib/functions');
const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const config = require('../config');

const API_URL = "https://api.skymansion.site/movies-dl/search";
const DOWNLOAD_URL = "https://api.skymansion.site/movies-dl/download";
const API_KEY = config.MOVIE_API_KEY;

cmd({
    pattern: "movie",
    alias: ["moviedl", "films"],
    react: '🎬',
    category: "download",
    desc: "Search and download movies from PixelDrain with quality selection",
    filename: __filename
}, async (robin, m, mek, { from, q, reply }) => {
    try {
        if (!q || q.trim() === '') return reply('❌ Please provide a movie name! (e.g., Avatar | 720p)');

        const [movieQuery, requestedQualityRaw] = q.split('|').map(s => s.trim());
        const requestedQuality = requestedQualityRaw?.toLowerCase();

        const searchUrl = `${API_URL}?q=${encodeURIComponent(movieQuery)}&api_key=${API_KEY}`;
        const response = await fetchJson(searchUrl);

        const results = response?.SearchResult?.result;
        if (!results?.length) return reply(`❌ No results found for: *${movieQuery}*`);

        const selectedMovie = results[0];
        const detailsUrl = `${DOWNLOAD_URL}/?id=${selectedMovie.id}&api_key=${API_KEY}`;
        const details = await fetchJson(detailsUrl);

        const pixelLinks = details?.downloadLinks?.result?.links?.driveLinks;
        if (!pixelLinks?.length) return reply('❌ No PixelDrain download links found.');

        // Quality list preview
        if (!requestedQuality) {
            const qualities = pixelLinks.map(link => `- ${link.quality}`).join('\n');
            return reply(
                `🎬 *${selectedMovie.title}* found!\n\n` +
                `*Available Qualities:*\n${qualities}\n\n` +
                `To download, use:\n.movie ${selectedMovie.title} | 720p`
            );
        }

        // Select quality
        const selectedDownload = pixelLinks.find(link =>
            link.quality.toLowerCase().includes(requestedQuality)
        );

        if (!selectedDownload) {
            return reply(`❌ No link found for quality: *${requestedQualityRaw}*`);
        }

        const fileId = selectedDownload.link.split('/').pop();
        const directDownloadLink = `https://pixeldrain.com/api/file/${fileId}?download`;

        const safeTitle = selectedMovie.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const filePath = path.join(__dirname, `${safeTitle}_${Date.now()}.mp4`);
        const writer = fs.createWriteStream(filePath);

        const { data } = await axios({
            url: directDownloadLink,
            method: 'GET',
            responseType: 'stream'
        });

        data.pipe(writer);

        writer.on('finish', async () => {
            await robin.sendMessage(from, {
                document: fs.readFileSync(filePath),
                mimetype: 'video/mp4',
                fileName: `${selectedMovie.title}-${requestedQualityRaw}.mp4`,
                caption: `*Nimsara-Md Movie Downloader*\n🎬 *${selectedMovie.title}*\n📥 Quality: ${selectedDownload.quality}`,
                quoted: mek
            });
            fs.unlinkSync(filePath);
        });

        writer.on('error', async (err) => {
            console.error('Download Error:', err);
            await reply('❌ Failed to download movie. Please try again.');
        });

    } catch (error) {
        console.error('Movie command error:', error);
        await reply('❌ Something went wrong. Please try again later.');
    }
});
