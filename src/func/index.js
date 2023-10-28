export const makePathForRouter = (str) => {
    const strAnySpace = str.split(" ").join("");
    return strAnySpace.toLowerCase();
}

export const transformDate = (date) => {
    const newDateFormat = new Date(date);
    return newDateFormat.toLocaleDateString();
}