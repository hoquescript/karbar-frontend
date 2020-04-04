import {createMuiTheme} from '@material-ui/core';
import indigo from '@material-ui/core/colors/indigo';

const theme = createMuiTheme({
    palette: {
        type: 'light',
        background: {
            paper: '#ececee',
            default: '#fff' 
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







// palette: {
//     type: 'dark',
//     background: {
//         paper: '#232b3e',
//         default: '#1a202e' 
//     },
//     header: {
//         collapseBackground: '#171d29',
//         background: '#1a202e',
//         searchBackground: '#f5f5f50a',
//         icon: '#7381a4',
//     },
//     drawer:{
//         main: {
//             icon: '',
//             text: '',
//             selectedIcon: '#5c77ff',
//             selectedText: '#fff',
//             selectedBackground: '#1890ff',
//             background: '#141924'
//         },
//         side: {
//             headIcon: '',
//             headText: 'aliceblue',
//             headBackground: '#171d29',
//             selectedHeadIcon: '#',
//             selectedHeadText: '#1890ff',
//             menuText: '#a1a2b6',
//             selectedMenuText: '#fff',
//             selectedMenuBackground: '#353b48',
//             background: '#1a202e'
//         }
//     },
//     primary: {
//         main: '#1890ff',
//         light: '#a8b3bd',
//         dark: '#014e95'
//     },
//     grey: {
//         50: '#363b47',
//         100: '#363b4729',
//         150: '#555a661f',
//         200: '#a4afca29',
//         1000: '#363b47'
//     }
// },
