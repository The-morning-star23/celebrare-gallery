# Celebrare Photo Gallery — Frontend Assignment

A responsive, high-performance photo gallery web application built for the Celebrare Frontend React Internship pre-screening assignment.

This project fetches data from the public Picsum API, allows users to filter images in real-time, and lets them save their favorite photos with persistence across page reloads.

## 🚀 Features

* **Data Fetching:** Loads 30 high-quality images on initial render using a custom `useFetchPhotos` hook, complete with loading spinners and error handling.
* **Responsive Grid:** Fully fluid layout utilizing Tailwind CSS.
  * Desktop: 4 columns
  * Tablet: 2 columns
  * Mobile: 1 column
* **Live Search Filter:** Users can search by the author's name. The grid updates in real-time without triggering additional API calls or page reloads.
* **Persistent Favorites:** Users can "heart" photos. This complex state is managed via `useReducer` and instantly synced with the browser's `localStorage` so favorites survive a page refresh.
* **Performance Optimized:** Strategically implements `useCallback` to prevent unnecessary re-renders of child components and `useMemo` to efficiently compute the filtered list of photos.

## 🛠️ Tech Stack

* **Framework:** React 18
* **Build Tool:** Vite
* **Styling:** Tailwind CSS (Strictly no UI component libraries)
* **API:** [Picsum Photos API](https://picsum.photos/)

## ⚙️ Getting Started

To run this project locally on your machine, follow these steps:

1. Clone the repository
   ```bash
   git clone https://github.com/The-morning-star23/celebrare-gallery.git
   ```

2. Navigate to the project directory
   ```bash
   cd celebrare-gallery
   ```

3. Install dependencies
   ```bash
   npm install
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

Open http://localhost:5173 in your browser to view the app.

## 🧠 Technical Decisions & Hooks Used

useReducer: Chosen over useState for the favorites feature to cleanly encapsulate the complex logic of checking existing IDs, adding/removing them, and syncing with localStorage.

useCallback: Applied to the search input handler and the favorite toggle function to maintain referential equality, preventing the PhotoCard components from re-rendering needlessly.

useMemo: Used to cache the filteredPhotos array. Array filtering can be computationally heavy; this ensures it only runs when the searchQuery or the photos array explicitly changes.

Custom Hooks: useFetchPhotos was created to separate the data-fetching and state management (loading/error) logic from the UI layer, keeping components clean and readable.