import {createMuiTheme} from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        type: 'light',
        background: {
            paper: '#f5f5f8',
            default: '#fff',
            table: '#fff' 
        },
        header: {
            collapseBackground: '#162160',
            background: '#fff',
            searchBackground: '#f5f5f50a',
            icon: '#201e64',
        },
        drawer:{
            main: {
                selectedIcon: '#5c77ff',
                selectedText: '#fff',
                selectedBackground: '#1890ff',
                background: '#001529'
            },
            side: {
                selectedMenuBackground: '#e6f7ff',
                background: '#fff'
            }
        },
        primary: {
            main: '#2c2c54',
            light: '#1890ff',
            dark: '#474787'
        },
        grey: {
            // 50: '#363b47',
            100: '#f4f3f3',
            150: '#f9f9f9',
            200: '#dbcece',
            1000: '#d1d5df'
        },
        typography:{
            main: '#333'
        }
    },
    typography: {
        htmlFontSize: 10
    }
})

export default theme;
