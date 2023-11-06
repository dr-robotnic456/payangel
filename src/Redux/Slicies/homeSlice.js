import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  eventData: {},
  eventId: "",
  ticketSuccess: false,
  ticketFail:false,
  unauthorized:false
};

const homeSlice = createSlice({
  name: "HOME",
  initialState,
  reducers: {
    setEventData: (state, action) => {
      state.eventData = action.payload;
    },
    setEventId: (state, action) => {
      state.eventId = action.payload;
    },
    setTicketSuccess: (state, action) => {
      state.ticketSuccess = action.payload;
    },
    setTicketFail: (state, action) => {
      state.ticketFail = action.payload;
    },
    setUnauthorized: (state, action) => {
      state.unauthorized = action.payload;
    }
   
  },
});

export const {
  setEventData,
  setEventId,
  setTicketSuccess,
  setTicketFail,
  setUnauthorized,
} = homeSlice.actions;
export default homeSlice.reducer;
