import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Board } from './components/Board/Board';
import { useFamilyData } from './hooks/useFamilyData';
import { useSidebarState } from './hooks/useSidebarState';
import { useBoardState } from './hooks/useBoardState';

import '@xyflow/react/dist/style.css';
import './App.css';

function App() {
  const [notification, setNotification] = useState({ type: '', message: '' });

  const {
    persons,
    families,
    loading,
    createPerson: createPersonDb,
    createFamily: createFamilyDb,
    savePerson: savePersonDb,
    saveFamily: saveFamilyDb,
    deletePerson,
    deleteFamily,
    API_BASE_URL
  } = useFamilyData(notification, setNotification);

  const {
    personSearch, setPersonSearch,
    familySearch, setFamilySearch,
    newPersons, newFamilies,
    editedPersons, editedFamilies,
    handlePersonEdit, handleFamilyEdit,
    cancelPersonEdit, cancelFamilyEdit,
    savePerson, saveFamily,
    createPerson, createFamily
  } = useSidebarState(persons, families, createPersonDb, createFamilyDb, savePersonDb, saveFamilyDb);

  const {
    nodes, edges,
    onNodesChange, onEdgesChange, onConnect,
    clearBoard, autoLayout,
    addPersonToBoard, addFamilyToBoard,
    expandAllOnBoard
  } = useBoardState(persons, setNotification, API_BASE_URL);

  const handleSave = () => {
    setNotification({ type: 'success', message: 'Board saved successfully!' });
  };

  return (
    <div className="app-container">
      <Sidebar 
        persons={persons}
        families={families}
        newPersons={newPersons}
        newFamilies={newFamilies}
        editedPersons={editedPersons}
        editedFamilies={editedFamilies}
        personSearch={personSearch}
        setPersonSearch={setPersonSearch}
        familySearch={familySearch}
        setFamilySearch={setFamilySearch}
        handlePersonEdit={handlePersonEdit}
        handleFamilyEdit={handleFamilyEdit}
        cancelPersonEdit={cancelPersonEdit}
        cancelFamilyEdit={cancelFamilyEdit}
        addPersonToBoard={addPersonToBoard}
        addFamilyToBoard={addFamilyToBoard}
        createPerson={createPerson}
        createFamily={createFamily}
        savePerson={savePerson}
        saveFamily={saveFamily}
        deletePerson={deletePerson}
        deleteFamily={deleteFamily}
      />
      
      <Board 
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        notification={notification}
        loading={loading}
        clearBoard={clearBoard}
        expandAllOnBoard={expandAllOnBoard}
        autoLayout={autoLayout}
        handleSave={handleSave}
      />
    </div>
  );
}

export default App;
