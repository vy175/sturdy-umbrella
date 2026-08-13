# How to Use the Family Tree Builder

**🌐 Live Demo:** [https://task3-eight-mu.vercel.app/](https://task3-eight-mu.vercel.app/)

Welcome to the Family Tree Builder! This guide will show you how to manage your database and build beautiful, interactive family trees.

## 1. Starting the Application

To run the application locally, you need to start both the backend and frontend servers.

**Open a terminal and run the backend:**
```bash
cd backend
npm install
npm run dev
```

**Open a second terminal and run the frontend:**
```bash
cd frontend
npm install
npm run dev
```

Once both are running, open your browser and navigate to the local URL provided by the frontend (usually `http://localhost:5173`).

---

## 2. Managing Data (The Sidebar)

The left-hand sidebar is your database management tool. It has two sections: **Families** and **Persons**.

### Creating People and Families
1. Click the **`+`** icon next to the "Persons" or "Families" header.
2. A temporary placeholder row will appear at the very top of the list.
3. Type in the person's name, gender, and birth year (or the family name).
4. Click the **Green Save Icon** to officially save them to the database.
5. If you change your mind, click the **Red X Icon** to cancel and discard the placeholder.

### Editing Data
1. To edit an existing person or family, simply click on their name or inputs in the sidebar and start typing.
2. The row will instantly switch to "Edit Mode".
3. Click the **Save Icon** to commit your changes, or the **Cancel Icon** to revert back.

### Deleting Data
1. Hover your mouse over any saved person or family in the sidebar.
2. A **Red Trash Can** icon will appear.
3. Click it to permanently delete that record from the database.

---

## 3. Building the Tree (The Board)

The large canvas on the right is where you actually visualize the connections.

### Adding Nodes to the Board
1. Find a person or family in the sidebar.
2. Click the **`+`** icon on their row to instantly spawn them onto the board.
3. You can click and drag them anywhere on the canvas.

### Connecting People (Creating Relationships)
To build a family, you must connect **Persons** to **Family Hubs** (the pink heart circles). 
> **Important Rule**: People cannot connect directly to other people! They must connect to a Family node.

1. Hover over a person node until a small grey dot appears.
2. Click and drag a line from the person to a family node.
3. Do this for all parents and children belonging to that family.

### Expanding the Tree Automatically
Instead of dragging nodes one by one, you can automatically expand them:
- **Expand Individual Node**: If a person has families that aren't currently on the board, a small `[...]` button will appear on their box. Click it to instantly spawn their immediate parents and children.
- **Expand All**: Click the **"Expand All"** button in the top right corner. The system will search the entire database and automatically draw the complete, massive family tree for everyone currently on the board.

### Organizing the Board
If your lines get messy and criss-crossed:
1. Click the **"Auto Layout"** button in the top right corner.
2. The system will automatically organize your tree into a clean, top-to-bottom hierarchy!
