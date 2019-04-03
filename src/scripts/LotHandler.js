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
    return bookings;
}

function getAvailableSpaces(data, response) {
    let bays = data['bays'];
    let bookings = response;
    let i = 0;
    // Bays is sorted list, so iterate over bookings and get ID's of bays
    for (i; i < bookings.length; i++) {
        let bayId = bookings[i]['bay_id'];
        // Get current time
        let currentTimestamp = Math.floor(Date.now() / 1000);
        let currentHour = new Date().getHours();
        let bookingArrivalTime = new Date(bookings[i]['arrival']*1000).getHours();
        let bookingDepartureTime = new Date(bookings[i]['departure']*1000).getHours();

        let timeToArrival = (bookings[i]['arrival'] - currentTimestamp)/60/60;
        // Check if booking is today
        if (timeToArrival >= -12 && timeToArrival < 12) {
            // Check if booking is active
            // Check if booking is now
            if (currentHour <= bookingDepartureTime && currentHour >= bookingArrivalTime)  {
                let booking = bookings[i];
                booking = {
                    'bay_id': booking['bay_id'],
                    'disabled': booking['disabled_required'],
                    'reg': booking['number_plate'],
                    'arrival': booking['arrival'],
                    'departure': booking['departure'],
                    'child': booking['child_required'],
                    'active': true
                };
                bays.find(bay => bay['bay_id'] === bayId)['booked'] = booking
            }
            // Coming in next hour
            else if ((currentHour - bookingArrivalTime) > -2 && (currentHour - bookingArrivalTime) < 0)  {
                let booking = bookings[i];
                booking = {
                    'bay_id': booking['bay_id'],
                    'disabled': booking['disabled_required'],
                    'reg': booking['number_plate'],
                    'arrival': booking['arrival'],
                    'departure': booking['departure'],
                    'child': booking['child_required'],
                    'active': false
                };
                bays.find(bay => bay['bay_id'] === bayId)['booked'] = booking
            }
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
