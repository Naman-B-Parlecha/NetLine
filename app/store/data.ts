import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name: "data",
    initialState: {
        data: [],
    },
    reducers: {
        setData(state, action) {
            state.data = action.payload;
        },
    },
});

export const dataActions = dataSlice.actions;
export default dataSlice.reducer;