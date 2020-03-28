const dateHelper = (data) => {
    const dateTemp = {}
    for (const key in data) {
        if(Object.prototype.toString.call(data[key]) === '[object Date]'){
            const date = data[key];
            const day = date.getDate()
            const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
            const month = months[date.getMonth()];
            const year = date.getFullYear();
            dateTemp[key] = `${day} ${month} ${year}`
        }
    }
    return {...data, ...dateTemp};
}

export default dateHelper;