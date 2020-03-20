import React, { useState } from "react";
import { useSelector } from "react-redux";
import Loading from "../Util/Loading/Loading";

const Table = () => {
    return <div>Hello</div>;
};

const GridView = () => {
    const isGridLoading = useSelector(state => state.forms.gridData.isGridLoading);

    let content;
    content = isGridLoading ? <Loading /> : <Table />;
    return <div>{content}</div>;
};

export default GridView;
