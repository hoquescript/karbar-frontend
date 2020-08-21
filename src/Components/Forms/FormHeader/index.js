import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from "react-redux"
import { Grid, Typography, Breadcrumbs } from '@material-ui/core';
import { CaretRightOutlined  } from '@ant-design/icons'
import IconGenarator from "../../Util/IconGenarator/IconGenarator"

const useStyles = makeStyles(theme => ({
    root : {
        padding: '15px 0',
        width:'100%',
        backgroundColor: theme.palette.background.default
    },
    headbar: {
        display: 'flex',
    },
    titleWrapper: {
      display: 'flex',
      flexDirection: 'column',
    },
    headIcon: {
      marginRight: theme.spacing(3),
      fontSize: 50,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: theme.palette.primary.main
    },
    mainTitle: {
        color: theme.palette.primary.main
    },
    subTitle:{
        color: theme.palette.primary.light
    },
    breadcrumb: {
        fontSize: 13,
        fontWeight: 400,
        color: theme.palette.primary.main,
        border: `1px solid ${theme.palette.grey[1000]}`,
        padding: '5px 10px',
    },
    link: {
        display: 'flex',
        fontSize: '1.4rem',
        color: theme.palette.primary.dark
    },
    main: {
        color: theme.palette.primary.main,
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: '2rem',
        height: '2rem',
    },

    
}));

const FormHeader = () => {
    const classes = useStyles();
    const {icon, primary, secondary, tertiary} = useSelector ( state => state.ui.breadCrumb )
    return (
        <div className={classes.root}>
            <Grid container justify="space-between" alignItems="center" style={{width: '130rem', margin: '0 auto'}}>
                <Grid item className={classes.headbar}> 
                    <span className={classes.headIcon}>{IconGenarator(secondary === "Forms" ? "FormOutlined" : "CopyOutlined")}</span>
                    <div className={classes.titleWrapper}>
                        <Typography variant="h6" className={classes.mainTitle}>{tertiary}</Typography>
                        <Typography variant="subtitle2" className={classes.subTitle}>{primary}</Typography>
                    </div>
                </Grid>
                <Grid item>
                    <Breadcrumbs separator={<CaretRightOutlined/>} className={classes.breadcrumb}>
                        <Typography className={classes.link}>
                            <span className={classes.icon}>{IconGenarator(icon)}</span>
                            {primary || 'Loading'}
                        </Typography>
                        <Typography className={classes.link}>
                            {secondary || '...' }
                        </Typography>
                        <Typography className={`${classes.link} ${classes.main}`}>
                            {tertiary || '...' }
                        </Typography>
                    </Breadcrumbs>
                </Grid>
            </Grid>
        </div>
    )
}

export default FormHeader;
