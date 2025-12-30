import { useState } from "react";
import api from "../api";

export default function CreatePaste() {
  const [content, setContent] = useState("");
  const [expiry, setExpiry] = useState("never");
  const [url, setUrl] = useState("");
  const[nothing,setNothing]=useState('')
  const submitPaste = async () => {
    if(!content){
      return(
    setNothing('please enter something before pressign the enter')
      )
    }
    const res = await api.post("/paste", { content, expiry });
    setUrl(`http://localhost:3000/${res.data.shortId}`);
  };

  return (
    <div>
      <h2>Create Paste</h2>

      <textarea
        rows="10"
        cols="60"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br />

      <select onChange={(e) => setExpiry(e.target.value)}>
        <option value="never">Never</option>
        <option value="10m">10 Minutes</option>
        <option value="1h">1 Hour</option>
        <option value="1d">1 Day</option>
      </select>

      <br /><br />

      <button onClick={submitPaste}>Create</button>
      {!content && (<h1>{nothing}</h1>)}
      

      {url && (
        <p>
          Share URL: <a href={url}>{url}</a>
        </p>
      )}
    </div>
  );
}
