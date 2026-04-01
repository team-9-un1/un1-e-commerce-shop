const cloudinary = require('cloudinary').v2;

// Cloudinary will automatically use CLOUDINARY_URL from process.env if available
cloudinary.config({
  secure: true
});

module.exports = cloudinary;
