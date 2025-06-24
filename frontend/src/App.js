import React, { useState } from "react";
import axios from "axios";

function App() {
  const [inputUrl, setInputUrl] = useState("");
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://amazon-product-link.onrender.com/api/get-links", { url: inputUrl });
      
      setResults(res.data.related_links);
    } catch (err) {
      alert("Error: " + err.response?.data?.error || "Unknown error");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Amazon Product Link Finder</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Paste Amazon product URL"
          className="border p-2 w-full"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
        />
        <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
          Get Related Links
        </button>
      </form>
      {results.length > 0 && (
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-semibold mb-2">Related Products:</h2>
          <ul className="list-disc pl-5">
            {results.map((link, index) => (
              <li key={index}>
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
