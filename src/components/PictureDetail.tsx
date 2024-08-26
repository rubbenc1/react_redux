import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetPicturesQuery } from '../store/services/picturesApi';

const PictureDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: pictures, isLoading, error } = useGetPicturesQuery({});
  const navigate = useNavigate();


  const picture = pictures?.find((pic: any) => pic.id === id || '');
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching picture</div>;

  if (!picture) {
    return <div>Picture not found</div>; // Handle case when no picture is found
  }

  return (
    <div>
      <h2>Picture by {picture.author}</h2>
      <img
        src={picture.download_url}
        alt={picture.author}
        style={{ width: '100%', height: 'auto' }}
      />
      <p>Author: {picture.author}</p>
      <button onClick={() => navigate(-1)}>Back to List</button> {/* Back button */}
    </div>
  );
};
//

export default PictureDetail;
