import { createSlice } from '@reduxjs/toolkit'

const form = createSlice({
    name: 'form',
    initialState: {
    },
    reducers: {
    }
})

export default form.reducer;
export const { setBreadcrumb, setUrlPath } = form.actions;
