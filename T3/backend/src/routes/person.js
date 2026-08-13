const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Person = require('../models/Person');
const Family = require('../models/Family');

router.post('/', async (req, res) => {
  try {
    const person = new Person(req.body);
    await person.save();
    res.status(201).json(person);
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
    
    const persons = await Person.find(query);
    res.status(200).json(persons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET the full descendant tree for a person using $graphLookup
router.get('/:id/tree', async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }

    const startFamilyIds = [
      ...(person.parentInFamilies || []),
      ...(person.childInFamilies || [])
    ];

    if (startFamilyIds.length === 0) {
      return res.status(200).json({ person, rootFamilies: [] });
    }

    const tree = await Family.aggregate([
      { $match: { _id: { $in: startFamilyIds } } },
      {
        $graphLookup: {
          from: 'families',
          startWith: '$children',
          connectFromField: 'children',
          connectToField: 'parents',
          as: 'descendantFamilies',
          depthField: 'descendantDepth'
        }
      },
      {
        $graphLookup: {
          from: 'families',
          startWith: '$parents',
          connectFromField: 'parents',
          connectToField: 'children',
          as: 'ancestorFamilies',
          depthField: 'ancestorDepth'
        }
      }
    ]);

    await Family.populate(tree, [
        { path: 'parents', model: 'Person' },
        { path: 'children', model: 'Person' },
        { path: 'descendantFamilies.parents', model: 'Person' },
        { path: 'descendantFamilies.children', model: 'Person' },
        { path: 'ancestorFamilies.parents', model: 'Person' },
        { path: 'ancestorFamilies.children', model: 'Person' }
    ]);

    res.status(200).json({ person, rootFamilies: tree });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const person = await Person.findByIdAndUpdate(req.params.id, req.body, { 
      new: true, 
      runValidators: true 
    });
    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.status(200).json(person);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const person = await Person.findByIdAndDelete(req.params.id);
    if (!person) {
      return res.status(404).json({ error: 'Person not found' });
    }
    res.status(200).json({ message: 'Person deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
