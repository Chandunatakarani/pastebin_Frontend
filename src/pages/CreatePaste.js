import { useState } from "react";
import api from "../api";
import Navbar from "../components/Navbar";

export default function CreatePaste() {
  const [content, setContent] = useState("");
  const [expiry, setExpiry] = useState("never");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const submitPaste = async () => {
    if (!content.trim()) {
      setError("Please enter some content before creating a paste");
      return;
    }

    setError("");
    const res = await api.post("/paste", { content, expiry });
    setUrl(`http://localhost:3000/${res.data.shortId}`);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-[calc(100vh-64px)] bg-gray-100 flex items-center justify-center px-4">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6">
          
          <h2 className="text-2xl font-semibold text-center mb-6">
            Create a New Paste
          </h2>

          <textarea
            placeholder="Enter your text here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-48 p-4 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       resize-none text-sm"
          />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
            <select
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="never">Never Expire</option>
              <option value="10m">10 Minutes</option>
              <option value="1h">1 Hour</option>
              <option value="1d">1 Day</option>
            </select>

            <button
              onClick={submitPaste}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg
                         hover:bg-blue-700 transition font-medium"
            >
              Create Paste
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-3">
              {error}
            </p>
          )}

          {url && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
              <p className="text-sm text-gray-600 mb-1">
                Share this link:
              </p>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 break-all hover:underline"
              >
                {url}
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
