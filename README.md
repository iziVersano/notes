# Notes

## Overview
Notes is a user-friendly note-taking web application built with React.js, Vite, and TypeScript. Styled with Bootstrap, it allows users to create, edit, delete, and share notes seamlessly. The app is responsive and interactive, ensuring a smooth experience across all devices.

## Objective
Develop a responsive and interactive note-taking application that efficiently manages user notes. The project structure supports easy addition of advanced features as the application grows.

## Features
- **Create, Edit, Delete:** Manage notes with titles and content.
- **Share Notes:** Generate unique read-only links.
- **List & Search:** View all notes and search by title.
- **Data Persistence:** Uses localStorage to save notes between sessions.
- **Responsive Design:** Ensured by Bootstrap.
- **State Management:** Utilizes React Query and Redux Toolkit.
- **Testing:** Includes unit and integration tests with Jest and React Testing Library.
- **Dockerization:** Simplifies setup and deployment.

## What's Missing
- **Integration Tests using Cypress**
  The application currently lacks end-to-end (E2E) tests with Cypress. Implementing Cypress would enhance reliability by simulating real user interactions.
  - **Example Test: Create a New Note**
    - **Open Create Note Modal:** Click the "Add Note" button.
    - **Enter Details:** Fill in the "Title" and "Content" fields.
    - **Submit Form:** Click the "Save" button.
    - **Verify Creation:** Ensure the new note appears in the notes list with correct details.

- **Improved Error Handling UI**
  Currently, the app uses browser alerts for error notifications. Integrating a library like `react-toastify` would provide a more user-friendly and customizable way to display errors.

- **Fix Broken Tests After Adding Markdown Model**
  After integrating the markdown model, some existing tests have become broken. These tests need to be updated to accommodate the new markdown features, ensuring all functionalities are thoroughly validated.

## Tech Stack
- **React.js:** User interface
- **Vite:** Development build tool
- **TypeScript:** Type safety
- **Bootstrap:** Styling
- **React Query:** Data fetching and caching
- **Redux Toolkit:** State management
- **Jest & React Testing Library:** Testing
- **Docker:** Containerization
- **LocalStorage:** Data persistence

## Project Structure
Organized by features for scalability and maintainability.

```css
src/
├── components/
├── config/
├── features/
│   ├── notes/
│   │   ├── api/
│   │   ├── state/
│   │   └── types.ts
│   └── ui/
├── hooks/
├── store/
├── utils/
│   └── localStorageManager.ts
└── ...
```

## Data Management
**LocalStorage Manager:** Located at `src/utils/localStorageManager.ts`, it abstracts localStorage operations, allowing easy integration with other databases as the app scales.

## State Management
### React Query & Redux Toolkit
- **React Query:** Handles data fetching, caching, and synchronization.
- **Redux Toolkit:** Manages client-side state with a streamlined approach.

This combination ensures efficient handling of both server and client states, providing a seamless user experience.

## Setup Instructions
1. **Clone the Repository**
   ```bash
   git clone git@github.com:iziVersano/notes.git
   cd notes
   ```

2. **Install Dependencies**
   ```bash
   yarn install
   ```

3. **Run the Development Server**
   ```bash
   yarn dev
   ```
   - Local: http://localhost:5173/

4. **Run Tests**
   ```bash
   yarn test
   ```

5. **Build for Production**
   ```bash
   yarn build
   ```

## Docker
### Production
1. **Build the Docker Image:**
   ```bash
   docker build -f Dockerfile -t notes .
   ```
2. **Run the Container:**
   ```bash
   docker run -p 80:80 notes
   ```
   - Access: http://localhost

### Development
1. **Build the Development Image:**
   ```bash
   docker build -f Dockerfile.dev -t notes-dev .
   ```
2. **Run the Container:**
   ```bash
   docker run -p 5173:5173 notes-dev
   ```
   - Access: http://localhost:5173

## Access the Application
Open your browser and navigate to:
- **Production:** http://localhost
- **Development:** http://localhost:5173
