const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { destroy } = require('../../models/Product');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: [
          'product_name'
        ]
      }
    ]
  }).then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: Product
    }
    ]
  }).then(dbTagData => {
    if(!dbTagData){
      res.status(404).json({message: 'NO TAG HERE DORK!!!'})
      return;
    }
    res.json(dbTagData);
  })
    .catch(err => {
      console.log(err, 'PLEASE!');
      res.status(500).json(err, "NOOO!!! AGAIN!! YOU DUMB!!");
    });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
    include: [{
      model: Product,
      attributes: ['product_id']
    }]
  }).then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err, 'WRONNNNGGGG');
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(dbTagData => {
    if (!dbTagData) {
      res.status(400).json({ message: "nOT HERE!!!!" })
      return;
    }
    res.json(dbTagData)
  })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then((tag) => {
    if(!tag){
      res.status(400).json({message: "NO TAGS HERE LOSER"})
      return;
    }
    res.json(tag);
  })
  .catch(err => {
    console.log(err, 'you messed this all up again');
    res.status(500).json(err);
  })

});

module.exports = router;
