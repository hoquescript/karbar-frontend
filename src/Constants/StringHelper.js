export const slugStringGenarator = (str) => {
    return str.toLowerCase()
                .replace(/[$&+,:;=?@#|'<>.^*()%!\]\\]/g, "")
                .replace("-", "")
                .replace("/" ," ")
                .replace(/ +/g, " ")
                .split(" ")
                .join("-")
}

export const componentStringGenarator = (str) => {
    return str.toLowerCase()
                .replace(/[$&+,:;=?@#|'<>.^*()%!\]\\]/g, "")
                .replace("-", "")
                .replace("/", " ")
                .replace(/ +/g, " ")
                .split(" ")
                .map( data => data.charAt(0).toUpperCase() + data.slice(1))
                .join("")  
}