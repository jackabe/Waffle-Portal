function processBookingInsights(bookingList) {
    let bookings = getBookingsForDate(bookingList, 'day');
    return bookings.length;
}

function getTotalRevenueForWeek(bookingList) {
    let bookings = getBookingsForDate(bookingList, 'week');
    let revenues = {};
    let i = 0;
    for (i; i < bookings.length; i++){
        let date = bookings[i]['arrival'];
        date = new Date(date * 1000);
        date = ("" + date.getUTCDate() + '/' + date.getUTCMonth() + '/' + date.getUTCFullYear());
        if (revenues[date]) {
            revenues[date] = revenues[date] + bookings[i]['price'];
        }
        else {
            revenues[date] = bookings[i]['price'];
        }
    }
    return revenues;
}

function getRevenueInsight(bookingList) {
    let bookings = getBookingsForDate(bookingList, 'day');
    let revenue = 0;
    let i = 0;
    for (i; i < bookings.length; i++){
        revenue += bookings[i]['price'];
    }
    return revenue;
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
            let previousWeek = new Date(today - 7 * 24 * 60 * 60 * 1000);
            today = ("" + today.getUTCDate() + today.getUTCMonth() + today.getUTCFullYear());
            let dateCompare = ("" + previousWeek.getUTCDate() + previousWeek.getUTCMonth() + previousWeek.getUTCFullYear());
            if ((parseInt(bookingCompare) >= parseInt(dateCompare)) && (parseInt(bookingCompare) <= parseInt(today)) ) {
                bookings.push(bookingList[i])
            }
        }
    }
    return bookings;
}

function processOfferInsights(offerList) {
    let totalVouchers = 0;
    let dailyVouchers = 0;
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; // January is 0!
    let yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    let string_today = dd + '-' + mm + '-' + yyyy;

    let i = 0;
    for (i; i < offerList.length; i++) {
        let offer = {
            logo: offerList[i]['logo'],
            company: offerList[i]['store'],
            offer: offerList[i]['offer'],
            expiry: offerList[i]['expiry_date'],
            offerId: offerList[i]['offer_id'],
            redemptionDate: offerList[i]['redemption_date'],
            scans: offerList[i]['scans'],
            redeem: offerList[i]['redeem'],
        };

        if (offer.redemptionDate == string_today && offer.redeem === true) {
            dailyVouchers += 1;
            totalVouchers += 1;
        } else if (offer.redeem === true) {
            totalVouchers += 1;
        }

        return {'daily': dailyVouchers, 'total': totalVouchers};
    }
}

module.exports = {
    processBookingInsights,
    processOfferInsights,
    getRevenueInsight,
    getTotalRevenueForWeek
};
