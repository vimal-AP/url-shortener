const Url = require('../models/Url');
const Visit = require('../models/Visit');

exports.getAnalytics = async (req, res) => {
  const url = await Url.findOne({ _id: req.params.id, user: req.user.id });
  if (!url) return res.status(404).json({ message: 'Not found' });
  const visits = await Visit.find({ urlId: url._id }).sort({ visitedAt: -1 }).limit(20);
  res.json({
    originalUrl: url.originalUrl,
    shortCode: url.shortCode,
    totalClicks: url.clicks,
    createdAt: url.createdAt,
    lastVisited: visits[0]?.visitedAt || null,
    recentVisits: visits.map(v => v.visitedAt)
  });
};