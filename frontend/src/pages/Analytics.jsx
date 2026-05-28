import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Analytics() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/analytics/${id}`)
      .then(res => setData(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!data) return <div className="p-6">Not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate('/dashboard')} className="text-blue-600 mb-4">← Back</button>
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-xl font-bold mb-4">Analytics</h2>
          <p className="text-sm text-gray-500 mb-1">Original URL</p>
          <p className="text-blue-600 break-all mb-4">{data.originalUrl}</p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded text-center">
              <p className="text-3xl font-bold text-blue-600">{data.totalClicks}</p>
              <p className="text-xs text-gray-500 mt-1">Total Clicks</p>
            </div>
            <div className="bg-green-50 p-4 rounded text-center">
              <p className="text-sm font-semibold text-green-600">
                {data.lastVisited ? new Date(data.lastVisited).toLocaleString() : 'Never'}
              </p>
              <p className="text-xs text-gray-500 mt-1">Last Visited</p>
            </div>
            <div className="bg-purple-50 p-4 rounded text-center">
              <p className="text-sm font-semibold text-purple-600">
                {new Date(data.createdAt).toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-500 mt-1">Created</p>
            </div>
          </div>
          <h3 className="font-semibold mb-2">Recent Visits</h3>
          <ul className="space-y-1">
            {data.recentVisits.length === 0 && <li className="text-gray-400 text-sm">No visits yet</li>}
            {data.recentVisits.map((v, i) => (
              <li key={i} className="text-sm text-gray-600 border-b py-1">
                {new Date(v).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}