const express = require('express');
const router = express.Router();
const article = require('../controllers/articles');
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/upload')
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime().toString() + '-' + file.fieldname + path.extname(file.originalname));
  }
});
const fileFilter = (req, file, cb) => {
  // reject file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter

})


router.get('/', (req, res) => {
  article.index(req, res);
});
router.get('/tambah', ensureAuthenticated, (req, res) => {
  article.add(req, res);
});
router.post('/addArticle', upload.single('imgfile'), (req, res) => {

  article.create(req, res);
});

router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  article.edit(req, res);
});
router.get('/:id', (req, res) => {
  article.take(req, res);
});
// Update Submit Form
router.post('/update/:id', (req, res) => {
  article.update(req, res);
});

// Delete  article

router.delete('/:id', (req, res) => {
  article.delete(req, res);
});
// Access control
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', 'please Login first');
    res.redirect('/users/login');
  }
}


module.exports = router;