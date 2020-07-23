import React from 'react'
import { AppstoreAddOutlined } from '@ant-design/icons';
import { Typography } from "@material-ui/core";

const AddBookmark = ({ styles }) => {
    return (
        <>
            <AppstoreAddOutlined className={styles}/>
            <Typography variant="subtitle1" style={{color: 'inherit'}}>Add Bookmark</Typography>
        </>
    )
}

export default AddBookmark
