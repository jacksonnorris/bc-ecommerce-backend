const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagsData = await Tag.findAll();
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagsData = await Tag.findByPk(req.params.id);
    if (!tagsData) {return res.status(404).json({message: 'There is no tag found with this id'});}
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const tagsData = await Tag.create(req.body);
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagsData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagsData) { return res.status(404).json({message: 'There is no tag found with this id'});}
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagsData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagsData) {return res.status(404).json({message: 'There is no tag found with this id'});}
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
