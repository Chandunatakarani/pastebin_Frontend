import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";

export default function ViewPaste() {
  const { id } = useParams();
  const [paste, setPaste] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/paste/${id}`)
      .then((res) => setPaste(res.data))
      .catch(() => setError("Paste not found or expired"));
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-blue-600">
            Pastebin Lite
          </Link>
          <Link
            to="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Create Paste
          </Link>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        {error && (
          <div className="bg-red-100 text-red-600 p-4 rounded-lg">
            {error}
          </div>
        )}

        {paste && (
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Your Paste
            </h2>

            <pre className="bg-gray-900 text-green-400 text-sm rounded-lg p-4 overflow-x-auto whitespace-pre-wrap">
              {paste.content}
            </pre>

            <div className="mt-4 text-sm text-gray-500 flex justify-between">
              <span>Paste ID: {id}</span>
              {paste.expiresAt && (
                <span>
                  Expires: {new Date(paste.expiresAt).toLocaleString()}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
