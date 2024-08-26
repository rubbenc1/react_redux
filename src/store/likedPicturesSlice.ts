import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LikedState {
  likedPictures: number[];
}

const initialState: LikedState = {
  likedPictures: [],
};

const likedPicturesSlice = createSlice({
  name: 'likedPictures',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (state.likedPictures.includes(id)) {
        state.likedPictures = state.likedPictures.filter(pictureId => pictureId !== id); // Unlike
      } else {
        state.likedPictures.push(id); // Like
      }
    },
    deletePicture: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.likedPictures = state.likedPictures.filter(pictureId => pictureId !== id); // Remove picture ID
    },
  },
});

export const { toggleLike, deletePicture } = likedPicturesSlice.actions;
export default likedPicturesSlice.reducer;
