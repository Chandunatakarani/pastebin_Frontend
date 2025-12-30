import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

export default function ViewPaste() {
  const { id } = useParams();
  const [paste, setPaste] = useState(null);

  useEffect(() => {
    api.get(`/paste/${id}`)
      .then(res => setPaste(res.data))
      .catch(() => setPaste(null));
  }, [id]);

  if (!paste) return <h3>Paste not found or expired</h3>;

  return (
    <div>
      <h2>Paste</h2>
      <pre>{paste.content}</pre>
    </div>
  );
}
