import { createSlice } from "@reduxjs/toolkit";

const tabSlice = createSlice({
    name: 'tab',
    initialState: {
        tab: 0,
    },
    reducers: {

        updateTab: (state, action) => {

            state.tab = action.payload;
        },

    },
});

export const { updateTab } = tabSlice.actions;
export default tabSlice.reducer;
