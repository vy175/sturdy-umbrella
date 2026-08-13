const express = require('express');
const router = express.Router();
const Family = require('../models/Family');
const Person = require('../models/Person');

const validatePersonIds = async (parents, children) => {
  const allIds = [];
  if (parents && Array.isArray(parents)) allIds.push(...parents);
  if (children && Array.isArray(children)) allIds.push(...children);
  
  if (allIds.length > 0) {
    const uniqueIds = [...new Set(allIds)];
    const existingCount = await Person.countDocuments({ _id: { $in: uniqueIds } });
    
    if (existingCount !== uniqueIds.length) {
      throw new Error('One or more Person IDs provided in parents or children do not exist.');
    }
  }
};

router.post('/', async (req, res) => {
  try {
    await validatePersonIds(req.body.parents, req.body.children);

    const family = new Family(req.body);
    await family.save();
    
    await family.populate(['parents', 'children']);
    
    res.status(201).json(family);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { name } = req.query;
    let query = {};
    
    if (name) {
      query.name = { $regex: new RegExp(name, 'i') };
    }
    
    const families = await Family.find(query);
      
    res.status(200).json(families);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const family = await Family.findById(req.params.id)
      .populate('parents')
      .populate('children');
      
    if (!family) {
      return res.status(404).json({ error: 'Family not found' });
    }
    res.status(200).json(family);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    await validatePersonIds(req.body.parents, req.body.children);

    const family = await Family.findByIdAndUpdate(req.params.id, req.body, { 
      new: true, 
      runValidators: true 
    }).populate('parents').populate('children');
    
    if (!family) {
      return res.status(404).json({ error: 'Family not found' });
    }
    res.status(200).json(family);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const family = await Family.findByIdAndDelete(req.params.id);
    if (!family) {
      return res.status(404).json({ error: 'Family not found' });
    }
    res.status(200).json({ message: 'Family deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
