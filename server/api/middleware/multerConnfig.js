const multer = require('multer');
const path = require('path');
let imageFileName = '';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/'); // Specify the directory where files should be uploaded
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        imageFileName = uniqueSuffix + path.extname(file.originalname);
        req.body.image = imageFileName;
        cb(null, imageFileName); // Use unique filenames
    }
});

const upload = multer({ storage });

module.exports = { upload };
