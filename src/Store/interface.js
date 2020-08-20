import { createSlice } from '@reduxjs/toolkit'

const ui = createSlice({
    name: 'ui',
    initialState: {
        urlPath: '',
        breadCrumb: {
            icon: '',
            primary: '',
            secondary: '',
            tertiary: ''
        }
    },
    reducers: {
        setBreadcrumb: (ui, action) => {
            ui.breadCrumb = action.payload.breadCrumb
        },
        setUrlPath: (ui, action) => {
            ui.urlPath = action.payload.path
        }
    }
})

export default ui.reducer;
export const { setBreadcrumb, setUrlPath } = ui.actions;
