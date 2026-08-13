# Full-Stack Engineering Assessment

**GitHub Repositories**:

- [vy175/sturdy-umbrella](https://github.com/vy175/sturdy-umbrella) (Personal Repo)

This repository contains solutions for the technical assessment, covering algorithmic problem solving (Task 1), a full-stack user management system (Task 2), and an interactive Family Tree Builder (Task 3).

---

## 🌐 Live Production Demos

### Task 2: User Management Portal
- **Frontend**: [https://sturdy-umbrella-zeta.vercel.app](https://sturdy-umbrella-zeta.vercel.app/) *(Hosted on Vercel)*
- **Backend API**: [https://sturdy-umbrella-4r11.onrender.com](https://sturdy-umbrella-4r11.onrender.com) *(Hosted on Render)*

### Task 3: Family Tree Builder
- **Frontend**: [https://task3-eight-mu.vercel.app/](https://task3-eight-mu.vercel.app/) *(Hosted on Vercel)*
- **Backend API**: [https://sturdy-umbrella-1-bxfd.onrender.com](https://sturdy-umbrella-1-bxfd.onrender.com) *(Hosted on Render)*

---

## 📁 Repository Overview

### [Task 1: Algorithm & Problem Solving](./T1)
- **`T1_1_ArrangeString`**: Custom string sorting algorithm with $O(N \log N)$ built-in and $O(N)$ counting sort solutions.
- **`T1_2_RunLengthEncoding`**: String compression algorithm implementing run-length encoding with single-character preservation.
- **`T1_3_TwoSum`**: Optimized $O(N)$ hash map solution finding two numbers that sum up to a target value.

### [Task 2: User Directory Management Portal](./T2)
A complete full-stack web application featuring:
- **Backend (`T2/backend`)**: Node.js & Express REST API with MongoDB Atlas integration, Bearer Token authentication, bulk update transactions, and input validation.
- **Frontend (`T2/frontend`)**: React 18 SPA powered by Vite 6 with case-insensitive search, live inline table editing, dynamic change tracking, bulk persistence, and callback refresh.

For complete implementation, setup, and architectural details, see the [Task 2 Documentation](./T2/README.md).

### [Task 3: Interactive Family Tree Builder](./T3)
A complex full-stack graph visualization tool for managing and mapping expansive family trees:
- **Backend (`T3/backend`)**: Node.js & MongoDB utilizing advanced multi-directional `$graphLookup` aggregation pipelines to recursively traverse and fetch complete ancestor and descendant lineages in a single query.
- **Frontend (`T3/frontend`)**: React & `@xyflow/react` powered interactive canvas with Dagre-based auto-layout. Features local UI state management (placeholders and inline editing buffers) separated cleanly into custom Hooks for a scalable architecture.

For technical details see the [T3 Technical Documentation](./T3/README.md) and for usage instructions see the [T3 User Guide](./T3/HOW-TO-USE.md).