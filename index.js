import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const download = async () => {
    setLoading(true);
    setResult(null);

    const res = await fetch(`/api/yt?url=${encodeURIComponent(url)}`);
    const data = await res.json();

    setResult(data);
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#111",
      color: "#fff"
    }}>
      <div style={{ width: 350 }}>
        <h2>YouTube Downloader</h2>

        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste YouTube link"
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 10
          }}
        />

        <button
          onClick={download}
          style={{
            width: "100%",
            padding: 10,
            background: "red",
            color: "#fff",
            border: "none"
          }}
        >
          {loading ? "Loading..." : "Download"}
        </button>

        {result?.video && (
          <div style={{ marginTop: 20 }}>
            <a
              href={result.video}
              target="_blank"
              style={{ color: "lime" }}
            >
              Download MP4
            </a>
          </div>
        )}

        {result?.error && (
          <p style={{ color: "orange" }}>{result.error}</p>
        )}
      </div>
    </div>
  );
                                  }
