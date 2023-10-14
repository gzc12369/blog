import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: [],
    },
    reducers: {
        search: (state, action) => {
            state.value = action.payload
        },
    },
});

// 为每个 case reducer 函数生成 Action creators
export const { search } = counterSlice.actions;

export default counterSlice.reducer;