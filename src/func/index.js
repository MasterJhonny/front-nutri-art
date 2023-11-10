export const makePathForRouter = (str) => {
    const strAnySpace = str.split(" ").join("");
    return strAnySpace.toLowerCase();
}

export const transformDate = (date) => {
    const newDateFormat = new Date(date);
    return newDateFormat.toLocaleDateString();
}

export const buildDataTable = (data) => {
    const newData = data.map(item=> {
        let newItem = {};
        if (item.created_at) {
            newItem = {
                ...newItem,
                created_at: transformDate(item.created_at)
            }
        } 
        if (item.import) {
            newItem = {
                ...newItem,
                import: parseFloat(item.import.toFixed(2)),
                costs: item.costs.map(item=> item.cost).join(', ')
            }
        } 
        if (item.salary) {
            newItem = {
                ...newItem,
                import: item.salary,
                costs: (item.salary / item.hours).toFixed(2)
            }
        } 
        if (item.amountMoth) {
            newItem = {
                ...newItem,
                import: item.amountMoth
            }
        }
        return {
            ...item,
            ...newItem
        }
    })
    return newData;
}

export const buildTotalImport = (data=[]) => {
    const total = data.reduce((acumulated, item)=> acumulated + item.import, 0);
    return total;
}
