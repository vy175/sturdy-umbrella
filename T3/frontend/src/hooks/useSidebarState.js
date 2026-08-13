import { useState } from 'react';

export const useSidebarState = (persons, families, createPersonFn, createFamilyFn, savePersonFn, saveFamilyFn) => {
  const [personSearch, setPersonSearch] = useState('');
  const [familySearch, setFamilySearch] = useState('');
  
  const [newPersons, setNewPersons] = useState([]);
  const [newFamilies, setNewFamilies] = useState([]);
  
  const [editedPersons, setEditedPersons] = useState({});
  const [editedFamilies, setEditedFamilies] = useState({});

  const createPerson = () => {
    const tempId = `temp-${Date.now()}`;
    const newPerson = { _id: tempId, name: '', gender: 'other', birthYear: new Date().getFullYear(), isTemp: true };
    setNewPersons(prev => [newPerson, ...prev]);
    setEditedPersons(prev => ({ ...prev, [tempId]: newPerson }));
  };

  const createFamily = () => {
    const tempId = `temp-${Date.now()}`;
    const newFamily = { _id: tempId, name: '', parents: [], children: [], isTemp: true };
    setNewFamilies(prev => [newFamily, ...prev]);
    setEditedFamilies(prev => ({ ...prev, [tempId]: newFamily }));
  };

  const handlePersonEdit = (id, field, value) => {
    let finalValue = value;
    if (field === 'birthYear' && value !== '') finalValue = Number(value);

    setEditedPersons(prev => ({
      ...prev,
      [id]: { ...(prev[id] || newPersons.find(p => p._id === id) || persons.find(p => p._id === id)), [field]: finalValue }
    }));
  };

  const handleFamilyEdit = (id, field, value) => {
    setEditedFamilies(prev => ({
      ...prev,
      [id]: { ...(prev[id] || newFamilies.find(f => f._id === id) || families.find(f => f._id === id)), [field]: value }
    }));
  };

  const cancelPersonEdit = (id) => {
    if (id.startsWith('temp-')) {
      setNewPersons(prev => prev.filter(p => p._id !== id));
    }
    setEditedPersons(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const cancelFamilyEdit = (id) => {
    if (id.startsWith('temp-')) {
      setNewFamilies(prev => prev.filter(f => f._id !== id));
    }
    setEditedFamilies(prev => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const savePerson = async (id) => {
    const data = editedPersons[id];
    let success = false;
    
    if (id.startsWith('temp-')) {
      const { _id, isTemp, ...body } = data;
      success = await createPersonFn(body);
      if (success) setNewPersons(prev => prev.filter(p => p._id !== id));
    } else {
      success = await savePersonFn(id, data);
    }
    
    if (success) {
      setEditedPersons(prev => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  const saveFamily = async (id) => {
    const data = editedFamilies[id];
    let success = false;
    
    if (id.startsWith('temp-')) {
      const { _id, isTemp, ...body } = data;
      success = await createFamilyFn(body);
      if (success) setNewFamilies(prev => prev.filter(f => f._id !== id));
    } else {
      success = await saveFamilyFn(id, data);
    }
    
    if (success) {
      setEditedFamilies(prev => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  return {
    personSearch,
    setPersonSearch,
    familySearch,
    setFamilySearch,
    newPersons,
    newFamilies,
    editedPersons,
    editedFamilies,
    handlePersonEdit,
    handleFamilyEdit,
    cancelPersonEdit,
    cancelFamilyEdit,
    savePerson,
    saveFamily,
    createPerson,
    createFamily
  };
};
