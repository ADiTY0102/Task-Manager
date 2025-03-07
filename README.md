# Task Creation and Management System

![Project Status](https://img.shields.io/badge/status-in%20progress-orange)  
![License](https://img.shields.io/badge/license-MIT-blue)  
![Node.js](https://img.shields.io/badge/Node.js-v18.x-green)  
![Express](https://img.shields.io/badge/Express-v4.x-blue)

A simple yet powerful backend-driven Task Creation and Management System built with Node.js, Express, and EJS as the view engine. This project allows users to create tasks with a title and description, submit them via a form, and view the three most recent tasks displayed as cards. The system leverages dynamic routing for flexible URL handling and Tailwind CSS for a clean, modern UI.

This is a **pure backend-focused project**, with the core logic residing in the server-side code, while EJS and static files provide a lightweight frontend interface.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [License](#license)

---

## Features

- **Task Creation**: Users can input a task title and description through a simple form.
- **Task Display**: Displays the three most recent tasks as cards on the homepage.
- **Dynamic Routing**: Flexible URL handling for future scalability (e.g., `/profile/:ADiTY0102`).
- **Backend-Driven**: Core logic handled by Node.js and Express, with minimal frontend dependencies.
- **Responsive Design**: Styled with Tailwind CSS for a modern, user-friendly interface.
- **EJS Templating**: Dynamic frontend rendering with calculations or logic embedded in views.

---

## Tech Stack

- **Backend**:
  - Node.js: JavaScript runtime for server-side logic.
  - Express: Web framework for routing and middleware.
- **Frontend**:
  - EJS: Embedded JavaScript templating for dynamic HTML pages.
  - Tailwind CSS: Utility-first CSS framework for styling.
- **Package Management**:
  - npm: For installing dependencies like Express and EJS.
- **Static Files**:
  - HTML, CSS, and JavaScript files served from a `public` directory.

---

## Installation

Follow these steps to set up the project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/task-manager.git
   cd task-manager

---

Folder Structure Conventions
============================

> Folder structurefor my Backend project

### A file structure layout

    .
    ├── public                  # Static files (CSS, JS, images)
    │   ├── css/                # CSS files, including Tailwind CSS output
    │   └── js/                 # JavaScript files for frontend logic
    ├── views                   # EJS templates for dynamic rendering
    ├── index.js                # Main server file and entry point
    ├── package.json            # Project metadata and dependencies
    ├── LICENSE                 # License file (optional)
    └── README.md               # Project documentation

> `LICENSE`, `README.md`
---

### Notes
-Porject `https://github.com/ADiTY0102/TaskManager.git` GitHub repository URL.
