const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [
      {
        model: Product
      }
    ]
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product
        //realized that I didn't need to specify attributes when getting a model
        // attributes: [
        //   'product_name'
        // ]
      }
    ]
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'NOTHING' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body, {
    category_name: req.body.category_name
  }) .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
      console.log(err, 'WRONNNNGGGG');
      res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
      where: {
        id: req.params.id,
      }
  }).then((cat) => {
    if(!cat){
      res.status(400).json({message: 'YOU DIED'})
      return;
    }
    res.json(cat)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(cat => {
    if (!cat) {
      res.status(404).json({ message: 'WRONG WRONG WRONG' })
      return;
    }
    res.json(cat)
  })
    .catch(err => {
      console.log(err, "NO NO NO");
      res.status(500).json(err)
    })
});

module.exports = router;
