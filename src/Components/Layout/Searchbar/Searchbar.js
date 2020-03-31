import React from 'react'
import { SearchOutlined  } from "@ant-design/icons";
import { makeStyles } from '@material-ui/core/styles';
import "./Searchbar.scss";

const useStyles = makeStyles((theme) => ({
    search: {
        flex: '0 0 40%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: 'translateX(-5px)'
    },
    input: {
        fontFamily: 'inherit',
        fontSize: 'inherit',
        width: '80%',
        padding: '0.7rem 2rem',
        backgroundColor: 'aliceblue',
        borderRadius: '15px',
        border: '1px solid #d7d2d2',
        transition: 'all 0.3s',
        marginRight: '-3.25rem',
        '&:focus' : {
            outline: 'none',
            width: '100%',
            backgroundColor: 'aliceblue',
        },
        '&::-webkit-input-placeholder' : {
            // fontSize: '1.4rem',
            // fontWeight: 100,
            // color: 'blue',
        }
    },
    button: {
        border: 'none',
        backgroundColor: '#1890ff',
        transform: 'translateX(-15px)',
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        '&:focus' : {
            outline: 'none',
        },
        // '&:active' : {
        //     transform: 'translateY(-2px)',
        // }
    },
    icon: {
        height: 43,
        width: 50,
        fontSize: 25,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#eee',

    }
}));
  
const Searchbar = () => {
    const classes = useStyles();
    return (
        <form className={classes.search}>
            <input type="text" placeholder="Search" className={classes.input}/>
            <button className={classes.button}>
                <SearchOutlined className={classes.icon} />
            </button>
        </form>
    )
}

export default Searchbar;
