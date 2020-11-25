const path = require('path');
const Article = require('../models/articles');
const User = require('../models/user');


exports.index = (req, res) => {
  Article.find({}).exec(function(err, article) {
    if (err) {
      return res.send(500, err);
    }
    res.render('index', {
      articles: article
    });
  });
}
exports.add = (req, res) => {
    res.render('add_article', {
      title: "Add Article"
    });
  },

  exports.create = (req, res) => {
    // Validate Form submit
    req.checkBody('title', 'Title is Required').notEmpty();
    //req.checkBody('author', 'Author is Required').notEmpty();
    req.checkBody('body', 'body is Required').notEmpty();
    // get errors
    const errors = req.validationErrors();
    if (errors) {
      res.render('add_article', {
        title: 'Add Article',
        errors: errors
      });
    } else {
      let article = new Article();
      article.title = req.body.title;
      article.author = req.user._id;
      article.body = req.body.body;
      article.productImage = 'upload/' + req.file.filename;
      article.save((err) => {
        if (err) {
          console.log(err);
          res.status(400).send('Unable to save to database');
        } else {
          req.flash('succes', 'article Added')
          res.redirect('/');
        }
      })

    }
  }

exports.edit = (req, res) => {
  Article.findById(req.params.id, (err, article) => {
    if (article.author != req.user._id) {
      req.flash('danger', 'Not Authorized');
      return res.redirect('/articles');
    }
    res.render('edit_article', {
      title: 'Edit Article',
      article: article
    })
  })
}
// UPDATE THE Article
exports.update = (req, res) => {
  let article = {};
  // Validate Form submit
  article.title = req.body.title;
  //article.author = req.user._id;
  article.body = req.body.body;

  const query = {
    _id: req.params.id
  }
  Article.update(query, article, (err) => {
    if (err) {
      console.log(err);
      return
    } else {
      req.flash('success', 'Article updated')
      res.redirect('/articles');
    }
  });
};
exports.delete = (req, res) => {
  if (!req.user._id) {
    res.status(500).send()
  }
  let query = {
    _id: req.params.id
  }
  Article.findById(req.params.id, (err, article) => {
    if (article.author != req.user._id) {
      res.status(500).send();
    } else {
      Article.remove(query, (err) => {
        if (err) {
          console.log(err);
        }
        res.send('Success');
      });
    }


  });
};
// Get Single Article
exports.take = (req, res) => {
  Article.findById(req.params.id, (err, article) => {
    User.findById(article.author, (err, user) => {
      res.render('article', {
        article: article,
        author: user.name
      })

    });
  });
};