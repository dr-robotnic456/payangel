import { api } from "../baseConfig";

export const registerQuery = api.injectEndpoints({
  endpoints: (builder) => ({
   
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "post",
        body: data,
      }),
    }),
    getProfile: builder.query({
      query: () => (
        {
          url:"/users/profile",
          method:"get"
        }
      )
    })
   

   
  }),
});

//for query useAuthQuery
export const {
  useLoginUserMutation,
  useGetProfileQuery
 
} = registerQuery;
