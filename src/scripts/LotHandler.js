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

function getBays(data) {
    let bays = data[2];
    return bays;
}

function getBookings(data) {
    let bookings = data['bookings'];
    console.log(bookings);
    return bookings;
}

function getAvailableSpaces(data) {
    let bays = data['bays']['bays'];
    let bookings = data['bookings'];
    let i = 0;
    // Bays is sorted list, so iterate over bookings and get ID's of bays
    for (i; i < bookings.length; i++) {
        let bay_id = bookings[i]['bay_id'];
        // Get current time
        let currentTimestamp = Math.floor(Date.now() / 1000);
        let bookingArrivalTime = bookings[i]['arrival'];
        let bookingDepartureTime = bookings[i]['departure'];
        let timeToArrival = Math.floor((bookingArrivalTime - currentTimestamp)/60/60);
        let timeToDeparture= Math.floor((bookingDepartureTime - currentTimestamp)/60/60);
        // Person is arriving or leaving in next hour
        if (timeToArrival < 2 || timeToDeparture < 2) {
            bays.find(bay => bay['bay_id'] === bay_id)['booked'] = true;
        }
    }
    return bays;
}



module.exports = {
    getLotDetails,
    getLotPrices,
    getBays,
    getBookings,
    getAvailableSpaces
};
