const getLeftDays = (fdate) => {
    if (!fdate) return -1;
    let date = new Date(fdate);
    return (date.getTime() - new Date(Date.now()).getTime())/(1000 * 3600 * 24)
}

const addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

module.exports = {getLeftDays, addDays};