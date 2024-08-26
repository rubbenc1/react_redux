import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const picturesApi = createApi({
    reducerPath: 'picturesApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://picsum.photos/v2/'}),
    endpoints: (builder) => ({
        getPictures: builder.query({
            query: ()=>'list',
        }),
    }),
});

export const {useGetPicturesQuery} = picturesApi