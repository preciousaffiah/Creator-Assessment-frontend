# Project Name

### Description

creator- A Global Saas all in one management for your businesses.

---

## Table of Contents

1. [Features](#features)
2. [Getting Started](#getting-started)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Available Scripts](#available-scripts)
6. [Pages & Routes](#pages--routes)
7. [Technologies Used](#technologies-used)

---

## Features

- **User Authentication**: Secure login and registration for users.
- **Role-Based Dashboards and Sidebar Routing**: Different dashboards and sidebar routes for Waiters and Admins.
- **Order Management**: Allows waiters to manage orders and track status.
- **Admin Controls**: Admin dashboard for managing users, orders, menus and viewing statistics.

---

## Getting Started

### Prerequisites

- Any globally installed packages (e.g., `yarn` or `npm`)

---

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/preciousaffiah/creator-admin.git
    ```
2. Navigate into the project directory:
    ```bash
    cd creator-admin
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
    or
    ```bash
    yarn install
    ```

---

## Usage

1. Start the development server:
    ```bash
    npm run start
    ```
    or
    ```bash
    yarn start
    ```
2. Open the application in your browser:
    ```
    http://localhost:3000
    ```

---

## Available Scripts

- **`yarn dev`**: Runs the app in development mode.
- **`yarn start`**: Runs the app in production mode.
- **`yarn build`**: Builds the app for production.

---

## Pages & Routes

| Page/Route            | URL                        | Description                                                             |
|-----------------------|----------------------------|-------------------------------------------------------------------------|
| **Home**              | `/`                        | The home page for all users, by default is the sign-in page.            |
| **Create Order**      | `/create-order`            | Page for both admin and waiter to create order.                         |
| **SignIn**            | `/auth/sign-in`            | The sign-in page for all users.                                         |
| **SignUn**            | `/auth/sign-up`            | The sign-up page for all users.                                         |
| **Start**             | `/auth/start`              | Start page after sign up.                                               |
| **Waiter Orders**     | `/waiter/orders`           | Orders page for waiters to view and manage orders.                      |
| **Waiter Dashboard**  | `/waiter/dashboard`        | Dashboard for waiters to view recent orders, tasks and statistics.      |
| **Admin Create Menu** | `/admin/create-menu`       | Page for admins to manage and create menus.                             |
| **Admin Menus**       | `/admin/menus`             | Page for admins to view manage and manage menus.                        |
| **Admin Orders**      | `/admin/orders`            | Page for admins to view and manage orders.                              |
| **Admin Users**       | `/admin/user`              | Page for admins to view and manage users.                               |
| **404 Page**          | `*`                        | Fallback route for undefined pages.                                     |

---

## Technologies Used

- **Framework**: Next.js.
- **CSS**: CSS, Tailwind CSS.
- **Routing**: Next.js router.
- **Build Tool**: Webpack.
- **Other Tools**: shadCN, recharts, lucide-react.

---
