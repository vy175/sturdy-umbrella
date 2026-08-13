import { useState, useEffect, useCallback } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const useFamilyData = (notification, setNotification) => {
  const [persons, setPersons] = useState([]);
  const [families, setFamilies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [personsRes, familiesRes] = await Promise.all([
        fetch(`${API_BASE_URL}/persons`),
        fetch(`${API_BASE_URL}/families`)
      ]);
      const pData = await personsRes.json();
      const fData = await familiesRes.json();
      setPersons(pData || []);
      setFamilies(fData || []);
    } catch (err) {
      setNotification({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  }, [setNotification]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const createPerson = async (data) => {
    try {
      const res = await fetch(`${API_BASE_URL}/persons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if(res.ok) {
        await fetchData();
        setNotification({ type: 'success', message: 'Person created' });
        return true;
      }
    } catch (err) {
      setNotification({ type: 'error', message: err.message });
    }
    return false;
  };

  const createFamily = async (data) => {
    try {
      const res = await fetch(`${API_BASE_URL}/families`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        await fetchData();
        setNotification({ type: 'success', message: 'Family created' });
        return true;
      }
    } catch (err) {
      setNotification({ type: 'error', message: err.message });
    }
    return false;
  };

  const savePerson = async (id, editedData) => {
    if (!editedData) return false;
    setLoading(true);
    try {
      const { _id, ...body } = editedData;
      const res = await fetch(`${API_BASE_URL}/persons/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        setNotification({ type: 'success', message: 'Person saved' });
        await fetchData();
        return true;
      }
    } catch (err) {
      setNotification({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
    return false;
  };

  const saveFamily = async (id, editedData) => {
    if (!editedData) return false;
    setLoading(true);
    try {
      const { _id, ...body } = editedData;
      const res = await fetch(`${API_BASE_URL}/families/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        setNotification({ type: 'success', message: 'Family saved' });
        await fetchData();
        return true;
      }
    } catch (err) {
      setNotification({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
    return false;
  };

  const deletePerson = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/persons/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setNotification({ type: 'success', message: 'Person deleted' });
        await fetchData();
        return true;
      }
    } catch (err) {
      setNotification({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
    return false;
  };

  const deleteFamily = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/families/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setNotification({ type: 'success', message: 'Family deleted' });
        await fetchData();
        return true;
      }
    } catch (err) {
      setNotification({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
    return false;
  };

  return {
    persons,
    families,
    loading,
    setLoading,
    fetchData,
    createPerson,
    createFamily,
    savePerson,
    saveFamily,
    deletePerson,
    deleteFamily,
    API_BASE_URL
  };
};
