# 📚 Minimal Library Management System – B5A4

A clean and minimal **Library Management System** built with **React**, **Redux Toolkit Query**, and **TypeScript**. This project allows users to view, add, edit, delete, and borrow books, with a simple UI and solid API integration.

>  Developed for Apollo Level-2 Web Development Assignment – B5A4

---

## 🌐 Live Site

🔗 [Frontend Live Link](https://redux-assignment-4-munna.vercel.app/books)  
🔗 [Backend Live Link (if any)](https://redux-assignemnt-4-backend.vercel.app/)

---

##  Project Overview

This is a **client-side** application that performs full **CRUD operations** on books and allows users to borrow books. The app is built using **React + TypeScript + Redux Toolkit Query** and connects to a **RESTful API backend** (MongoDB + Express.js).

---

##  Features

###  Public Routes

All pages are accessible without login or authentication.

### 📚 Book Management

- **Book List Table**
  - Columns: `Title`, `Author`, `Genre`, `ISBN`, `Copies`, `Availability`, and `Actions`
  - Sortable, responsive layout

- **Action Buttons:**
  -  Edit Book (opens pre-filled form)
  -  Delete Book (with confirmation modal)
  -  Borrow Book (form with quantity & due date)

- **Add New Book**
  - Fields: Title, Author, Genre, ISBN, Description, Copies
  - Defaults `available = true`

### 📖 Borrow Book

- Opens form with:
  - `Quantity` (max = copies)
  - `Due Date` (date)
- Submits via API and updates UI
- Marks book as unavailable if `copies === 0`

###  Borrow Summary

- Aggregated summary of borrowed books
- Columns: `Book Title`, `ISBN`, `Total Quantity Borrowed`
- Uses aggregation API endpoint

---

##  Page Routes

| Route | Description |
|-------|-------------|
| `/books` | All books with view, edit, delete, and borrow options |
| `/create-book` | Add new book form |
| `/books/:id` | View details of a specific book |
| `/edit-book/:id` | Edit book info |
| `/borrow/:bookId` | Borrow form |
| `/borrow-summary` | Summary of all borrowed books |

---

##  UI/UX

- ✅ Minimalist & clean design using Tailwind CSS
- ✅ SweetAlert2 for confirmation modals
- ✅ Fully responsive across devices
- ✅ Easy navigation and consistent layout

---

##  Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React + TypeScript |
| Styling | Tailwind CSS |
| State Management | Redux Toolkit + RTK Query |
| API Integration | REST API |
| Backend (Optional) | Node.js + Express.js |
| Database | MongoDB + Mongoose |

---

##  Bonus Features Implemented

| Feature |  Status |
|--------|-----------|
| Optimistic UI Updates |  |
| Toast Notifications |  Using SweetAlert2 |
| Responsive Layout |  
| Type-Safe Forms | 

---

##  Backend Overview (If Included)

- **Database Collections:**
  - `Books`: title, author, genre, isbn, description, copies, available
  - `Borrows`: bookId, quantity, dueDate

- **APIs:**
  - `GET /books` – fetch all books
  - `POST /books` – add a book
  - `PATCH /books/:id` – update a book
  - `DELETE /books/:id` – delete a book
  - `POST /borrow` – borrow a book
  - `GET /borrow-summary` – borrow summary (aggregation)

---

##  Installation

1. Clone the repo:
   ```bash
    FrontEnd
 https://github.com/md-munna-khan/Assignment-4-redux

  Backend
https://github.com/md-munna-khan/B5-A4-Backend
```
