# Destinize Frontend

A modern React-based frontend application for Destinize, a travel and tourism platform. This application allows users to explore travel packages, make reservations, and manage their bookings, while administrators can manage travel packages, galleries, orders, and admin accounts.

## Features

*   **User Authentication**: Secure login/registration for users and administrators using Google OAuth.
*   **Travel Package Management**: Admins can create, view, update, and delete travel packages.
*   **Gallery Management**: Admins can upload and manage photos for each travel package.
*   **Booking System**: Users can view available packages, make reservations, upload payment bukti, and track their orders.
*   **Admin Dashboard**: Centralized management interface for administrators.
*   **Responsive Design**: User-friendly interface accessible on various devices.

## Tech Stack

*   **Frontend**: React, Vite
*   **Styling**: Tailwind CSS, Flowbite React
*   **State Management**: React Query (for data fetching and caching)
*   **Routing**: React Router DOM
*   **API Interaction**: Axios
*   **Authentication**: Google OAuth

## Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/fadlananshari/fadlananshari-frontend-destinize.git
    cd fadlananshari-frontend-destinize
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following:
    ```
    VITE_GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
    ```
    *(Note: The provided code has a hardcoded Google Client ID in `src/main.jsx`. It's recommended to move this to an environment variable for better security and flexibility.)*

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Build for production:**
    ```bash
    npm run build
    ```

## Usage

### User Interface

*   **Landing Page**: Browse featured travel packages and learn about Destinize.
*   **Paket Wisata**: View all available travel packages.
*   **Paket Wisata Detail**: See details of a specific travel package, including gallery images, and make a reservation.
*   **Pesanan**: View your booking history and upload payment bukti.
*   **Kredit**: Information about design credits.
*   **Login**: User login page.

### Admin Interface

*   **Admin Login**: Secure login for administrators.
*   **Admin Dashboard**: Overview of system statistics (packages, orders, admins).
*   **Paket Wisata**: Manage all travel packages.
*   **Galeri**: Manage image galleries for packages.
*   **Pesanan**: View and manage all user reservations.
*   **Admin Management**: Manage administrator accounts.

## Project Structure
