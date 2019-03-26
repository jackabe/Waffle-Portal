function getLotDetails(data) {
    let details = data[0];
    return {
        name: details['name'],
        capacity: details['capacity'],
        lat: details['latitude'],
        long: details['longitude'],
        lot_id: details['id'],
        city: details['city'],
        favourite: false
    };
}

function getLotPrices(data) {
    let prices = data[1];
    return prices;
}

function getSpacesAndBookings(data, details) {
    let bays = data[2];
    return bays;
}

module.exports = {
    getLotDetails,
    getLotPrices,
    getSpacesAndBookings
};
