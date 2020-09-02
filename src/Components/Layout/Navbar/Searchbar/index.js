import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { SearchOutlined  } from "@ant-design/icons";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    search: {
        flex: '0 0 40%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '70rem'
        // transform: 'translateX(-5px)',
        // marginLeft: '6rem'
    },
    input: {
        fontFamily: 'inherit',
        fontSize: 'inherit',
        width: '100%',
        padding: '.8rem 2rem',
        backgroundColor: theme.palette.header.searchBackground,
        borderRadius: '.5rem',
        border: `1px solid ${theme.palette.grey[1000]}`,
        transition: 'all 0.3s',
        marginRight: '-3.25rem',
        '&:focus' : {
            outline: 'none',
            width: '100%',
            backgroundColor: '#f7f7f7'
        },
        '&::-webkit-input-placeholder' : {
            fontSize: '1.4rem',
            fontWeight: 100,
            color: '#aaa',
        }
    },
    button: {
        border: 'none',
        backgroundColor: 'transparent',
        transform: 'translateX(-5px)',
        borderTopRightRadius: '.5rem',
        borderBottomRightRadius: '.5rem',
        '&:focus' : {
            outline: 'none',
        },
    },
    icon: {
        fontSize: '2rem',
        color: theme.palette.primary.icon,
    },
    // panel: {
    //     backgroundColor: 'red',
    //     padding: '2rem 2.5rem',
    //     position: 'absolute',
    //     top: 40,
    //     left: 5,
    //     width: '100%',
    //     zIndex: 100000,
    // }
}));
  
const Searchbar = ({style}) => {
    const classes = useStyles();
    // const allMenu = useSelector ( state => state.menu.allMenu )
    // Object.keys(allMenu.basic).forEach(menu => {
    //     const second = allMenu.basic[menu];
    //     const value = Object.keys(second.children).map(key => {
    //         const third = second.children[key]
    //         return third;
    //     })
    //     console.log(menu, second, value)
    // })
    return (
        <div style={{position: 'relative'}}>
            <form style={style} className={classes.search}>
                <input type="text" placeholder="Search for Something..." className={classes.input}/>
                <button className={classes.button}>
                    <SearchOutlined className={classes.icon} />
                </button>
            </form>
            {/* <div className={classes.panel}>
                <ul>
                    <li><a href=""></a></li>
                    <li><a href="">Accounts Management -> Post: GL Voucher</a></li>
                    <li><a href="">Accounts Management -> Post: GL Voucher</a></li>
                    <li><a href="">Accounts Management -> Post: GL Voucher</a></li>
                </ul>
            </div> */}
        </div>
    )
}

export default Searchbar;
