import { useState, useReducer, useCallback, useMemo } from 'react';
import useFetchPhotos from './hooks/useFetchPhotos';
import { favoritesReducer, initFavorites } from './reducers/favoritesReducer';
import PhotoCard from './components/PhotoCard';

function App() {
  // 1. Fetch data using our custom hook
  const { photos, loading, error } = useFetchPhotos();

  // 2. Manage favorites state with useReducer
  const [favorites, dispatch] = useReducer(favoritesReducer, [], initFavorites);

  // 3. Manage search input state
  const [searchQuery, setSearchQuery] = useState('');

  // 4. useCallback for the search filter handler
  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  // Handle Favorite Toggle (also memoized for performance)
  const handleToggleFavorite = useCallback((id) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: id });
  }, []);

  // 5. useMemo to compute the filtered photo list
  const filteredPhotos = useMemo(() => {
    if (!searchQuery) return photos;
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [photos, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header & Search Bar */}
        <header className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Celebrare Gallery</h1>
          <input
            type="text"
            placeholder="Search by author..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
          />
        </header>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
          </div>
        )}
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Responsive Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPhotos.length > 0 ? (
              filteredPhotos.map((photo) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  isFavorite={favorites.includes(photo.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center py-10">
                No photos found for "{searchQuery}".
              </p>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default App;