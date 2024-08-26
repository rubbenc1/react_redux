import React, { useState } from 'react';
import { useGetPicturesQuery } from '../store/services/picturesApi';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLike } from '../store/likedPicturesSlice';
import { useNavigate } from 'react-router-dom';

const PicturesList: React.FC = () => {
  const { data: pictures, error, isLoading } = useGetPicturesQuery({});
  const likedPictures = useSelector((state: any) => state.likedPictures.likedPictures); // Use array of liked picture IDs
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showLikedOnly, setShowLikedOnly] = useState(false);
  const [visiblePictures, setVisiblePictures] = useState<any[]>([]); // Local state to manage pictures

  // Set visiblePictures when the pictures are first loaded
  React.useEffect(() => {
    if (pictures) {
      setVisiblePictures(pictures);
    }
  }, [pictures]);

  const handleLikeToggle = (id: number) => {
    dispatch(toggleLike(id));
  };

  const handleDelete = (id: number) => {
    // Filter out the deleted picture from the visiblePictures state
    const updatedPictures = visiblePictures.filter(picture => picture.id !== id);
    setVisiblePictures(updatedPictures);
  };

  const handleCardClick = (id: number) => {
    navigate(`/picture/${id}`); 
  };

  const handleFilterToggle = () => {
    setShowLikedOnly(!showLikedOnly);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching pictures</div>;

  const filteredPictures = showLikedOnly
    ? visiblePictures?.filter((picture: any) => likedPictures.includes(picture.id))
    : visiblePictures;

  return (
    <div>
      <button onClick={handleFilterToggle}>
        {showLikedOnly ? 'Show All' : 'Show Liked'}
      </button>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredPictures?.map((picture: any) => (
          <div
            key={picture.id}
            style={{
              margin: '10px',
              border: '1px solid #ddd',
              padding: '10px',
              position: 'relative',
              cursor: 'pointer',
              width: '200px',
            }}
            onClick={() => handleCardClick(picture.id)} // Navigate to detail view on click
          >
            <img
              src={picture.download_url}
              alt={picture.author}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <p>{picture.author}</p>

            {/* Like button */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering card click when liking
                handleLikeToggle(picture.id);
              }}
              style={{
                position: 'absolute',
                top: '10px',
                right: '40px',
                color: likedPictures.includes(picture.id) ? 'red' : 'gray',
              }}
            >
              {likedPictures.includes(picture.id) ? '❤️' : '♡'}
            </button>

            {/* Delete button */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering card click when deleting
                handleDelete(picture.id);
              }}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
              }}
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PicturesList;
