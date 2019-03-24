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

function getLotSpaces(data, details) {
    let capacity = details['capacity'];
    let bays = data[2];
    let i = 0;
    for (i; i < bays.length; i++) {
        let bookings = bays[i][1]
        if (bookings.length === 0) {
            // no bookings
        }
        else {
            capacity -= 1;
        }
    }
    return capacity;
}

function getSpacesAndBookings(data, details) {
    let bookings = data[2];
    let baysWithBookings = [];
    let i = 0;
    for (i; i < bookings.length; i++) {
        let bayId = bookings[i][0];
        let previousId = false;
        if (i > 0) {
            previousId = bookings[i-1][0];
        }
        if (previousId !== bayId) {
            baysWithBookings.push(bayId);
        }
    }
    let capacity = details['capacity'];
    let bays = [];
    i = 1;
    for (i; i <= capacity; i++) {
        let j = 0;
        let bay;
        let booked = false;
        for (j; j < baysWithBookings.length; j++) {
            if (baysWithBookings[j] == i) {
              booked = true;
            }
        }
        bay = {
            bayId: i,
            booked: booked
        };
        bays.push(bay);
    }
    return bays;
}

module.exports = {
    getLotDetails,
    getLotPrices,
    getLotSpaces,
    getSpacesAndBookings
};
