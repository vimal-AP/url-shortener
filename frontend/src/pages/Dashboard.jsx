import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function Dashboard() {
  const [urls, setUrls] = useState([]);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(null);
  const { email, logout } = useAuth();
  const navigate = useNavigate();

  const fetchUrls = async () => {
    const { data } = await api.get('/urls');
    setUrls(data);
  };

  useEffect(() => { fetchUrls(); }, []);

  const handleShorten = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await api.post('/urls', { originalUrl: input });
      setInput('');
      fetchUrls();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to shorten');
    } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this URL?')) return;
    await api.delete(`/urls/${id}`);
    fetchUrls();
  };

  const handleCopy = (shortUrl, id) => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">URL Shortener</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-sm">{email}</span>
            <button onClick={() => { logout(); navigate('/login'); }}
              className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded">Logout</button>
          </div>
        </div>

        <form onSubmit={handleShorten} className="bg-white p-4 rounded shadow mb-6 flex gap-2">
          <input className="flex-1 border p-2 rounded" placeholder="Paste a long URL..."
            value={input} onChange={e => setInput(e.target.value)} required />
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}>{loading ? 'Shortening...' : 'Shorten'}</button>
        </form>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="space-y-3">
          {urls.map(url => (
            <div key={url._id} className="bg-white p-4 rounded shadow flex flex-col sm:flex-row sm:items-center gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-500 truncate">{url.originalUrl}</p>
                <a href={url.shortUrl} target="_blank" rel="noreferrer"
                  className="text-blue-600 font-medium text-sm">{url.shortUrl}</a>
                <p className="text-xs text-gray-400 mt-1">
                  Created: {new Date(url.createdAt).toLocaleDateString()} · Clicks: <strong>{url.clicks}</strong>
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleCopy(url.shortUrl, url._id)}
                  className="text-xs bg-gray-100 px-3 py-1 rounded hover:bg-gray-200">
                  {copied === url._id ? '✓ Copied' : 'Copy'}
                </button>
                <button onClick={() => navigate(`/analytics/${url._id}`)}
                  className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200">
                  Analytics
                </button>
                <button onClick={() => handleDelete(url._id)}
                  className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200">
                  Delete
                </button>
              </div>
            </div>
          ))}
          {urls.length === 0 && <p className="text-center text-gray-400 py-10">No URLs yet. Shorten one above!</p>}
        </div>
      </div>
    </div>
  );
}