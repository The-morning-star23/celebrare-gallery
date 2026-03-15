// This function checks localStorage on initial load
export const initFavorites = () => {
  const savedFavorites = localStorage.getItem('favoritePhotoIds');
  return savedFavorites ? JSON.parse(savedFavorites) : [];
};

// The reducer handles the complex state logic of adding/removing favorites
export const favoritesReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_FAVORITE': {
      const photoId = action.payload;
      let newState;
      
      if (state.includes(photoId)) {
        // If it's already a favorite, remove it
        newState = state.filter((id) => id !== photoId);
      } else {
        // If it's not a favorite, add it
        newState = [...state, photoId];
      }
      
      // Persist the new state to localStorage immediately
      localStorage.setItem('favoritePhotoIds', JSON.stringify(newState));
      return newState;
    }
    default:
      return state;
  }
};