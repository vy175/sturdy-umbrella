import React, { useState } from 'react';
import { Plus, Save, ChevronDown, ChevronRight, X, Trash2 } from 'lucide-react';
import './Sidebar.css';

export const Sidebar = ({
  persons,
  families,
  newPersons,
  newFamilies,
  editedPersons,
  editedFamilies,
  personSearch,
  setPersonSearch,
  familySearch,
  setFamilySearch,
  handlePersonEdit,
  handleFamilyEdit,
  addPersonToBoard,
  addFamilyToBoard,
  createPerson,
  createFamily,
  savePerson,
  saveFamily,
  cancelPersonEdit,
  cancelFamilyEdit,
  deletePerson,
  deleteFamily
}) => {
  const [familiesExpanded, setFamiliesExpanded] = useState(true);
  const [personsExpanded, setPersonsExpanded] = useState(true);

  const filteredPersons = persons.filter(p => p.name.toLowerCase().includes(personSearch.toLowerCase()));
  const filteredFamilies = families.filter(f => f.name.toLowerCase().includes(familySearch.toLowerCase()));

  const displayPersons = [...newPersons, ...filteredPersons];
  const displayFamilies = [...newFamilies, ...filteredFamilies];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">Family Tree</h1>
        <p className="sidebar-subtitle">Drag components to the board to build the tree.</p>
      </div>

      {/* Families Section */}
      <div className="sidebar-section">
        <div className="section-header" style={{ cursor: 'pointer' }} onClick={() => setFamiliesExpanded(!familiesExpanded)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {familiesExpanded ? <ChevronDown size={16} color="#64748b" /> : <ChevronRight size={16} color="#64748b" />}
            <span className="section-title">Families</span>
          </div>
          <button className="icon-btn" onClick={(e) => { e.stopPropagation(); createFamily(); }} title="Create New Family Placeholder">
            <Plus size={16} />
          </button>
        </div>
        
        {familiesExpanded && (
          <>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search families..." 
              value={familySearch}
              onChange={e => setFamilySearch(e.target.value)}
            />
            <div className="list-container">
              {displayFamilies.map(family => {
                const currentVals = editedFamilies[family._id] || family;
                const isEdited = !!editedFamilies[family._id];
                return (
                  <div key={family._id} className="list-item">
                    <div className="list-item-content">
                      <input 
                        type="text" 
                        className="inline-input" 
                        value={currentVals.name} 
                        onChange={e => handleFamilyEdit(family._id, 'name', e.target.value)}
                        placeholder="Family Name"
                        title="Edit Family Name"
                      />
                    </div>
                    <div className="row-actions">
                      {isEdited && (
                        <>
                          <button className="icon-btn" style={{color: '#ef4444'}} onClick={() => cancelFamilyEdit(family._id)} title="Cancel changes">
                            <X size={18} />
                          </button>
                          <button className="icon-btn" style={{color: '#16a34a'}} onClick={() => saveFamily(family._id)} title="Save changes">
                            <Save size={18} />
                          </button>
                        </>
                      )}
                      {!family.isTemp && !isEdited && (
                        <button className="icon-btn delete-btn" style={{color: '#ef4444'}} onClick={() => deleteFamily(family._id)} title="Delete Family">
                          <Trash2 size={18} />
                        </button>
                      )}
                      {!family.isTemp && (
                        <button className="icon-btn" onClick={() => addFamilyToBoard(family._id)} title="Add Family to Board">
                          <Plus size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>

      {/* Persons Section */}
      <div className="sidebar-section" style={{ borderBottom: 'none' }}>
        <div className="section-header" style={{ cursor: 'pointer' }} onClick={() => setPersonsExpanded(!personsExpanded)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {personsExpanded ? <ChevronDown size={16} color="#64748b" /> : <ChevronRight size={16} color="#64748b" />}
            <span className="section-title">Persons</span>
          </div>
          <button className="icon-btn" onClick={(e) => { e.stopPropagation(); createPerson(); }} title="Create New Person Placeholder">
            <Plus size={16} />
          </button>
        </div>

        {personsExpanded && (
          <>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search persons..." 
              value={personSearch}
              onChange={e => setPersonSearch(e.target.value)}
            />
            <div className="list-container">
              {displayPersons.map(person => {
                const currentVals = editedPersons[person._id] || person;
                const isEdited = !!editedPersons[person._id];
                return (
                  <div key={person._id} className="list-item">
                    <div className="list-item-content">
                      <input 
                        type="text" 
                        className="inline-input" 
                        style={{ fontWeight: 600 }}
                        value={currentVals.name || ''} 
                        onChange={e => handlePersonEdit(person._id, 'name', e.target.value)}
                        placeholder="Person Name"
                        title="Edit Person Name"
                      />
                      <div className="inline-row">
                        <select 
                          className="inline-select"
                          value={currentVals.gender || ''}
                          onChange={e => handlePersonEdit(person._id, 'gender', e.target.value)}
                          title="Edit Gender"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                        <input 
                          type="number" 
                          className="inline-input inline-small" 
                          value={currentVals.birthYear || ''} 
                          onChange={e => handlePersonEdit(person._id, 'birthYear', e.target.value)}
                          title="Edit Birth Year"
                        />
                      </div>
                    </div>
                    <div className="row-actions">
                      {isEdited && (
                        <>
                          <button className="icon-btn" style={{color: '#ef4444'}} onClick={() => cancelPersonEdit(person._id)} title="Cancel changes">
                            <X size={18} />
                          </button>
                          <button className="icon-btn" style={{color: '#16a34a'}} onClick={() => savePerson(person._id)} title="Save changes">
                            <Save size={18} />
                          </button>
                        </>
                      )}
                      {!person.isTemp && !isEdited && (
                        <button className="icon-btn delete-btn" style={{color: '#ef4444'}} onClick={() => deletePerson(person._id)} title="Delete Person">
                          <Trash2 size={18} />
                        </button>
                      )}
                      {!person.isTemp && (
                        <button className="icon-btn" onClick={() => addPersonToBoard(person._id)} title="Add Person to Board">
                          <Plus size={18} />
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
