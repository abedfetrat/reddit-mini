import { createSlice } from "@reduxjs/toolkit";

const searchTermSlice = createSlice({
    name: "searchTerm",
    initialState: {
        current: "",
        previous: null,
    },
    reducers: {
        changeTerm: (state, action) => {
            state.current = action.payload;
        },
        updatePrevTerm: (state, action) => {
            state.previous = state.current;
        }
    }
});

export const { changeTerm, updatePrevTerm } = searchTermSlice.actions;
export default searchTermSlice.reducer;