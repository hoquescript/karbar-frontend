import React from 'react'
import { Breadcrumb, Icon } from "antd";
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from "react-redux"
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root : {
        padding: '20px 200px',
        backgroundColor: '#fff',
    },
    headbar: {
        display: 'flex',
    },
    titleWrapper: {
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Open Sans', sans-serif"
    },
    icon: {
      marginRight: theme.spacing(3),
      fontSize: 50,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#0f236f'
    },
    breadcrumb: {
        fontSize: 14,
        fontWeight: 600,
        color: '#6c78a6;',
        border: '1px solid #ccc',
        padding: '5px'
    }
}));

const Headbar = () => {
    const classes = useStyles();
    const {icon, first, second, third} = useSelector ( state => state.menu.menuPathways )
    return (
        <Grid container justify="space-between" alignItems="center" className={classes.root}>
            <Grid item className={classes.headbar}> 
                <Icon type={second === "Forms" ? "form" : "copy"} className={classes.icon}/>
                <div className={classes.titleWrapper}>
                    <Typography variant="h6" style={{color: '#0f236f'}}>{third}</Typography>
                    <Typography variant="subtitle2">{first}</Typography>
                </div>
            </Grid>
            <Grid item>
                <Breadcrumb className={classes.breadcrumb}>
                    <Breadcrumb.Item>
                        <Icon type={icon} style={{marginRight: 5}}/>
                        {first || 'Loading'}
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {second || '...' }
                    </Breadcrumb.Item>
                    <Breadcrumb.Item style={{color: '#0f236f'}}>{third || '...' }</Breadcrumb.Item>
                </Breadcrumb>
            </Grid>
        </Grid>
    )
}

export default Headbar;
