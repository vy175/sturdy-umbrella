import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:5000/api';

function App() {
  // Authentication & Core State
  const [token, setToken] = useState('super_secret_auth_token_key_123');
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Track changes made by the user before committing to backend
  // Map structure: { [userId]: { username, email, birthdate } }
  const [editedUsers, setEditedUsers] = useState({});
  
  // Status and Validation Banners
  const [notification, setNotification] = useState({ type: '', message: '' });

  // Clear notifications after 5 seconds
  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ type: '', message: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Search API Call (GET)
  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setNotification({ type: '', message: '' });
    
    try {
      const response = await fetch(`${API_BASE_URL}/users?name=${encodeURIComponent(searchQuery)}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP Error ${response.status}`);
      }

      // Format MongoDB date strings to short YYYY-MM-DD for visual simplicity
      const formattedData = (data || []).map(user => ({
        ...user,
        birthdate: user.birthdate ? user.birthdate.split('T')[0] : ''
      }));

      setUsers(formattedData);
      setEditedUsers({}); // Clear any pending edits on new search
    } catch (err) {
      setUsers([]);
      setNotification({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  // Perform initial load of all records on mount
  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update a field in local state
  const handleFieldChange = (userId, field, value) => {
    const originalUser = users.find(u => u.id === userId);
    if (!originalUser) return;

    // Get current changes for this specific user
    const userChanges = editedUsers[userId] || { ...originalUser };
    
    // Update target field
    userChanges[field] = value;

    // If the changed record matches original exactly, remove it from changes state
    const isBackToOriginal = 
      userChanges.username === originalUser.username &&
      userChanges.email === originalUser.email &&
      userChanges.birthdate === originalUser.birthdate;

    setEditedUsers(prev => {
      const updated = { ...prev };
      if (isBackToOriginal) {
        delete updated[userId];
      } else {
        updated[userId] = userChanges;
      }
      return updated;
    });
  };

  // Bulk Save API Call (POST)
  const handleBulkUpdate = async () => {
    const recordsToUpdate = Object.keys(editedUsers).map(id => ({
      id,
      ...editedUsers[id]
    }));

    if (recordsToUpdate.length === 0) {
      setNotification({ type: 'error', message: 'No edited changes found to submit.' });
      return;
    }

    setLoading(true);
    setNotification({ type: '', message: '' });

    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(recordsToUpdate)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Bulk update failed');
      }

      setNotification({ type: 'success', message: 'Database updated successfully.' });
      setEditedUsers({});
      
      // Callback: Refresh the table records
      await handleSearch();
    } catch (err) {
      setNotification({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  // Revert all unsaved changes in the table
  const handleDiscardChanges = () => {
    setEditedUsers({});
    setNotification({ type: 'success', message: 'All pending changes discarded.' });
  };

  const hasChanges = Object.keys(editedUsers).length > 0;

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1 className="title">User Directory Management</h1>
        <p className="subtitle">Search, validate, and inline-edit global credentials.</p>
      </header>

      {/* Security Credentials Bar */}
      <section className="credentials-section">
        <div className="section-header">API Security Token</div>
        <div className="input-group">
          <input 
            type="text" 
            className="input-field monospace" 
            value={token} 
            onChange={(e) => setToken(e.target.value)} 
            placeholder="Authorization Bearer Token..."
          />
          <span className="helper-label">Bearer Method Active</span>
        </div>
      </section>

      {/* Search Input Bar */}
      <section className="search-section">
        <form onSubmit={handleSearch} className="search-bar">
          <input 
            type="text" 
            className="input-field" 
            placeholder="Search by username or email address..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="button primary-button" disabled={loading}>
            Search
          </button>
        </form>
      </section>

      {/* Notifications Banner */}
      {notification.message && (
        <div className={`notification-banner ${notification.type === 'error' ? 'banner-error' : 'banner-success'}`}>
          <div className="banner-content">
            <span className="banner-title">{notification.type === 'error' ? 'System Error' : 'Success'}</span>
            <span className="banner-text">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Results Dashboard */}
      <section className="results-section">
        <div className="table-header-row">
          <div className="results-count">
            {users.length} {users.length === 1 ? 'record found' : 'records found'}
            {hasChanges && <span className="unsaved-pill">{Object.keys(editedUsers).length} unsaved edits</span>}
          </div>
          {hasChanges && (
            <div className="action-buttons">
              <button onClick={handleDiscardChanges} className="button secondary-button" disabled={loading}>
                Revert Edits
              </button>
              <button onClick={handleBulkUpdate} className="button success-button" disabled={loading}>
                Save Changes to DB
              </button>
            </div>
          )}
        </div>

        <div className="table-container">
          {users.length > 0 ? (
            <table className="user-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Birthdate</th>
                  <th className="status-col">Changes</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  const hasUserBeenChanged = !!editedUsers[user.id];
                  const currentUserValues = editedUsers[user.id] || user;

                  return (
                    <tr key={user.id} className={hasUserBeenChanged ? 'row-modified' : ''}>
                      <td>
                        <input
                          type="text"
                          className="table-input"
                          value={currentUserValues.username}
                          onChange={(e) => handleFieldChange(user.id, 'username', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="email"
                          className="table-input"
                          value={currentUserValues.email}
                          onChange={(e) => handleFieldChange(user.id, 'email', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="date"
                          className="table-input date-input"
                          value={currentUserValues.birthdate}
                          onChange={(e) => handleFieldChange(user.id, 'birthdate', e.target.value)}
                        />
                      </td>
                      <td className="status-col">
                        {hasUserBeenChanged ? (
                          <span className="indicator-text modified-text">Unsaved</span>
                        ) : (
                          <span className="indicator-text clean-text">Saved</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              {loading ? (
                <div className="loading-state">Contacting database clusters...</div>
              ) : (
                <div className="no-records-state">No matching records found. Enter a keyword above to search.</div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
