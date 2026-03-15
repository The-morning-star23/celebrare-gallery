const PhotoCard = ({ photo, isFavorite, onToggleFavorite }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Image */}
      <img
        src={photo.download_url}
        alt={`Photograph by ${photo.author}`}
        className="w-full h-64 object-cover"
        loading="lazy"
      />
      
      {/* Card Content: Author and Heart Button */}
      <div className="p-4 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-800 truncate pr-4">
          {photo.author}
        </h3>
        
        <button
          onClick={() => onToggleFavorite(photo.id)}
          className="focus:outline-none transform transition-transform active:scale-75"
          aria-label="Toggle Favorite"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-7 h-7 transition-colors duration-200 ${
              isFavorite ? 'text-red-500 fill-current' : 'text-gray-400 fill-none hover:text-red-400'
            }`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PhotoCard;