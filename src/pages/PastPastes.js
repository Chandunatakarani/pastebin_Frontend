import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import Navbar from "../components/Navbar";


export default function PastPastes() {
  const [pastes, setPastes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/paste")
      .then((res) => setPastes(res.data || []))
      .catch(() => setPastes([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar/>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Past Pastes
        </h2>

        {/* Loading */}
        {loading && (
          <p className="text-gray-500">Loading pastes...</p>
        )}

        {/* No pastes */}
        {!loading && pastes.length === 0 && (
          <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
            No pastes available or expired
          </div>
        )}

        {/* Pastes list */}
        {!loading && pastes.length > 0 && (
          <div className="space-y-4">
            {pastes.map((paste) => (
              <div
                key={paste._id}
                className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
              >
                <Link
                  to={`/${paste.shortId}`}
                  className="text-blue-600 font-medium hover:underline"
                >
                  View Paste
                </Link>

                <div className="mt-2 text-sm text-gray-500 flex justify-between">
                  <span>
                    Created:{" "}
                    {new Date(paste.createdAt).toLocaleString()}
                  </span>

                  {paste.expiresAt ? (
                    <span>
                      Expires:{" "}
                      {new Date(paste.expiresAt).toLocaleString()}
                    </span>
                  ) : (
                    <span>Never expires</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
