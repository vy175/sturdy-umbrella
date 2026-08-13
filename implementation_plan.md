# Add Delete Functionality & Fix Creation Workflow

Currently, when you click `+`, it instantly sends a `POST` request to the database to create a "New Person", and then fetches the entire database again to display it at the bottom of the list. This is why you saw the API being called immediately.

I will completely overhaul this to match your request: clicking `+` will only create a temporary local placeholder at the top of the list, and it won't touch the database until you click **Save**.

## Proposed Changes

### 1. Delete Functionality
- I will add a **Delete (Trash)** icon to every row in the sidebar.
- Clicking this will send a `DELETE` request to the backend and remove the person or family from the database entirely.

### 2. Local Placeholder Creation
- Clicking `+` will no longer call the backend API.
- Instead, it will inject a temporary placeholder at the **very top** of the sidebar list.
- This placeholder will instantly be in "Edit Mode" (showing Save/Cancel buttons).
- If you click **Cancel**, the placeholder will simply vanish without ever touching the database.
- If you click **Save**, it will take the data you typed and send a `POST` request to actually create it in the database.

### 3. File Updates
- **`useFamilyData.js`**: I will add `deletePerson` and `deleteFamily` API calls, and update `createPerson` to take data as an argument instead of hardcoding "New Person".
- **`useSidebarState.js`**: I will add state arrays to track `newPersons` and `newFamilies` (the temporary placeholders). I will route the `Save` button to either `POST` (if it's new) or `PUT` (if it's an existing edit).
- **`Sidebar.jsx`**: I will render the new placeholders at the top of the lists and add the Trash icons.

## User Review Required

> [!IMPORTANT]
> This will drastically improve the UX, preventing "garbage data" from instantly being saved to your database when you accidentally click `+`. 
>
> If you approve of this workflow, click **Proceed** and I will build it!
