import axios from "axios";

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.json({ error: "YouTube URL missing" });
  }

  try {
    const api =
      "https://ytdl.socialplug.io/api/video-info?url=" +
      encodeURIComponent(url);

    const response = await axios.get(api);

    const video =
      response.data?.videos?.find(v => v.ext === "mp4");

    if (!video) {
      return res.json({ error: "Video not found" });
    }

    res.json({
      status: "success",
      video: video.url
    });

  } catch (e) {
    res.json({ error: "Failed to fetch video" });
  }
}
