import { createSlice } from '@reduxjs/toolkit'

const ui = createSlice({
    name: 'ui',
    initialState: {
        darkMode: false,
        urlPath: '/',
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
        },
        setDarkMode: (ui, action) => {
            ui.darkMode = action.payload.darkMode
        }
    }
})

export default ui.reducer;
export const { setBreadcrumb, setUrlPath, setDarkMode } = ui.actions;
