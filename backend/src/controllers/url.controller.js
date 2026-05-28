const { nanoid } = require('nanoid');
const validUrl = require('valid-url');
const Url = require('../models/Url');
const Visit = require('../models/Visit');

exports.createShortUrl = async (req, res) => {
  const { originalUrl } = req.body;
  if (!validUrl.isUri(originalUrl)) return res.status(400).json({ message: 'Invalid URL' });
  try {
    const shortCode = nanoid(6);
    const url = await Url.create({ user: req.user.id, originalUrl, shortCode });
    res.status(201).json({ ...url.toObject(), shortUrl: `${process.env.BASE_URL}/${shortCode}` });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserUrls = async (req, res) => {
  const urls = await Url.find({ user: req.user.id }).sort({ createdAt: -1 });
  const result = urls.map(u => ({
    ...u.toObject(),
    shortUrl: `${process.env.BASE_URL}/${u.shortCode}`
  }));
  res.json(result);
};

exports.deleteUrl = async (req, res) => {
  const url = await Url.findOne({ _id: req.params.id, user: req.user.id });
  if (!url) return res.status(404).json({ message: 'Not found' });
  await url.deleteOne();
  await Visit.deleteMany({ urlId: req.params.id });
  res.json({ message: 'Deleted' });
};

exports.redirectUrl = async (req, res) => {
  const url = await Url.findOne({ shortCode: req.params.code });
  if (!url) return res.status(404).json({ message: 'URL not found' });
  url.clicks += 1;
  await url.save();
  await Visit.create({ urlId: url._id });
  res.redirect(url.originalUrl);
};