const Review = require('../models/review');
const Comment = require('../models/comment')

module.exports = function(app) {
    app.get('/', (req, res) => {
        Review.find()
          .then(reviews => {
    
            var database=[];
            for(var i=0;i<reviews.length;i++)
            {
                database[i]=reviews[i].toObject();
            }
    
            res.render('reviews-index', { reviews: database });
          })
          .catch(err => {
            console.log(err);
          })
    })
    
    //NEW
    app.get('/reviews/new', (req, res) => {
        res.render('reviews-new', {title: "New Review"});
    })
    
    //CREATE
    app.post('/reviews', (req, res) => {
        Review.create(req.body).then((review) => {
    
          console.log(review);
          res.redirect(`/reviews/${review._id}`)
        }).catch((err) => {
          console.log(err.message);
        })
    })

      // SHOW
  app.get('/reviews/:id', (req, res) => {
    // find review
    Review.findById(req.params.id).then(review => {
      // fetch its comments
      review = review.toObject();
      Comment.find({ reviewId: req.params.id }).then(comments => {
        // respond with the template with both values

        var database=[];
        for(var i=0;i<comments.length;i++)
        {
            database[i]=comments[i].toObject();
        }
      
        res.render('reviews-show', { review: review, comments: database })
      })
    }).catch((err) => {
      // catch errors
      console.log(err.message)
    });
  });


    
    //EDIT
    app.get('/reviews/:id/edit', (req, res) => {
      Review.findById(req.params.id, function(err, review) {
        review = review.toObject();
        res.render('reviews-edit', {review: review, title: "Edit Review"});
      })
    })
    
    // UPDATE
    app.put('/reviews/:id', (req, res) => {
      Review.findByIdAndUpdate(req.params.id, req.body)
        .then(review => {
          res.redirect(`/reviews/${review._id}`)
        })
        .catch(err => {
          console.log(err.message)
        })
    })
    
    // DELETE
    app.delete('/reviews/:id', function (req, res) {
      console.log("DELETE review")
      Review.findByIdAndRemove(req.params.id).then((review) => {
        res.redirect('/');
      }).catch((err) => {
        console.log(err.message);
      })
    })
};