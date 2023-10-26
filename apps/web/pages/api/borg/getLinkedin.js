const BORG_ID_BASE_URL = "https://api.borg.id/providers/linkedin/in/";

export default async function rss(req, res) {
  const query = req.query;
  const { user } = query;
  if (!user) {
    return res.status(400).json({ error: "Missing or invalid user id" });
  } else {
    try {
      const response = await fetch(`${BORG_ID_BASE_URL}${user}/full`, {
        headers: {
          Authorization: `Bearer ${process.env.BORG_ID_API_KEY}`,
        },
      });
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  }
}
