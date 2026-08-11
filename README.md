# Full-Stack Engineering Assessment

This repository contains solutions for the technical assessment, covering algorithmic problem solving (Task 1) and a full-stack user management system (Task 2).

---

## 🌐 Live Production Demo (Task 2)

- **Frontend Portal**: [https://sturdy-umbrella-zeta.vercel.app](https://sturdy-umbrella-zeta.vercel.app/) *(Hosted on Vercel)*
- **Backend API**: [https://sturdy-umbrella-4r11.onrender.com](https://sturdy-umbrella-4r11.onrender.com) *(Hosted on Render)*
- **Database**: MongoDB Atlas Cluster

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