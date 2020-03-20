import React, { useState } from "react";
import Loading from "../Util/Loading/Loading";

const Table = () => {
    return <div>Hello</div>;
};

const GridView = () => {
    const [isLoading, setIsLoading] = useState(true);
    let content = null;
    console.log(isLoading);
    content = isLoading ? <Loading /> : <Table />;
    return <div>{content}</div>;
};

export default GridView;
