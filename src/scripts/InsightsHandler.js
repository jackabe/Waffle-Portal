function processBookingInsights(bookingList) {
    let bookings = getBookingsForDate(bookingList, 'today');
    return bookings.length;
}

function getTotalRevenueForWeek(bookingList) {
    let bookings = getBookingsForDate(bookingList, 'week');
    let revenues = {};
    let i = 0;
    for (i; i < bookings.length; i++){
        let date = bookings[i]['arrival'];
        if (bookings[i]['booked']) {
            date = new Date(date * 1000);
            date = ("" + date.getUTCDate() + '/' + date.getUTCMonth() + '/' + date.getUTCFullYear());
            if (revenues[date]) {
                revenues[date] = revenues[date] + bookings[i]['price'];
            }
            else {
                revenues[date] = bookings[i]['price'];
            }
        }
        else {
            date = ("" + date.getUTCDate() + '/' + date.getUTCMonth() + '/' + date.getUTCFullYear());
            revenues[date] = 0;
        }
    }
    return revenues;
}

function getTotalBookingsForWeek(bookingList) {
    let bookings = getBookingsForDate(bookingList, 'week');
    let total_bookings = {};
    let i = 0;
    for (i; i < bookings.length; i++){
        let date = bookings[i]['arrival'];
        if (bookings[i]['booked']) {
            date = new Date(date * 1000);
            date = ("" + date.getUTCDate() + '/' + date.getUTCMonth() + '/' + date.getUTCFullYear());
            if (total_bookings[date]) {
                total_bookings[date] = total_bookings[date] + 1
            }
            else {
                total_bookings[date] = 1;
            }
        }
        else {
            date = ("" + date.getUTCDate() + '/' + date.getUTCMonth() + '/' + date.getUTCFullYear());
            total_bookings[date] = 0;
        }
    }
    return total_bookings;
}

function getRevenueInsight(bookingList) {
    let bookings = getBookingsForDate(bookingList, 'today');
    let revenue = 0;
    let i = 0;
    for (i; i < bookings.length; i++){
        revenue += bookings[i]['price'];
    }
    return revenue;
}

function getDateArray(start, end) {
    let week = [];
    let startDate = start;
    while (startDate <= end) {
        week.push(new Date(startDate));
        startDate.setDate(startDate.getDate() + 1);
    }
    return week;
}

function getBookingsForDate(bookingList, dateType) {
    let i = 0;
    let bookings = [];
    for (i; i < bookingList.length; i++){
        let bookingDate = bookingList[i]['arrival'];
        let bookingUnix = new Date(bookingDate * 1000);
        let bookingDD = bookingUnix.getUTCDate();
        let bookingMM = bookingUnix.getUTCMonth();
        let bookingYYYY = bookingUnix.getUTCFullYear();

        let bookingCompare = ("" + bookingDD + bookingMM + bookingYYYY);

        if (dateType === 'today') {
            let date = new Date();
            let dd = date.getUTCDate();
            let mm = date.getUTCMonth();
            let yyyy = date.getUTCFullYear();
            let dateCompare = ("" + dd + mm + yyyy);
            if (dateCompare === bookingCompare) {
                bookings.push(bookingList[i])
            }
        }
        else if (dateType === 'week') {
            let today = new Date();
            let lastWeek = new Date(today - 7 * 24 * 60 * 60 * 1000);
            if (bookingUnix <= today && bookingUnix >= lastWeek ) {
                bookingList[i]['booked'] = true;
                bookings.push(bookingList[i])
            }
        }
    }

    if (bookings.length > 0 && dateType === 'week') {
        let today = new Date();
        let lastWeek = new Date(today - 7 * 24 * 60 * 60 * 1000);
        let week = getDateArray(lastWeek, today);
        let dayCounter = 0;
        for (dayCounter; dayCounter < week.length; dayCounter++) {
            let booked = false;
            i = 0;
            for (i; i < bookings.length; i++) {
                let bookingUnix = new Date(bookings[i]['arrival'] * 1000);
                let bookingDate = ("" + bookingUnix.getUTCDate() + bookingUnix.getUTCMonth() + bookingUnix.getUTCFullYear());
                let date = ("" + week[dayCounter].getUTCDate() + week[dayCounter].getUTCMonth() + week[dayCounter].getUTCFullYear());
                if (bookingDate === date) {
                    booked = true
                }
            }
            if (!booked) {
                bookings.push({booked: false, arrival: week[dayCounter]})
            }
        }
    }
    return bookings;
}

function processOfferInsights(offerList) {
    let today = new Date();
    let lastWeek = new Date(today - 7 * 24 * 60 * 60 * 1000);
    let offerCounter = 0;
    let offersThisWeek = {};
    for (offerCounter; offerCounter < offerList.length; offerCounter++) {
        let offer = offerList[offerCounter];
        if (offer.redeem) {
            let offerRedemptionDate = new Date(offer['redemption_date'] * 1000);
            if (offerRedemptionDate > lastWeek) {
                let store = offer['store'];
                if (offersThisWeek[store]) {
                    offersThisWeek[store] = offersThisWeek[store] + 1;
                }
                else {
                    offersThisWeek[store] = 1
                }
            }
        }
    }
    return offersThisWeek
}

module.exports = {
    processBookingInsights,
    processOfferInsights,
    getRevenueInsight,
    getTotalRevenueForWeek,
    getTotalBookingsForWeek
};
