function processBookingInsights(bookingList) {
    let dailyBooking = 0;
    // Booking dates stored as UNIX Timestamp so converting current date into correct format to compare.
    let date = new Date();
    let dd = date.getUTCDate();
    // This is 0-11 but it doesn't matter as we are converting the booking date the same way
    let mm = date.getUTCMonth();
    let yyyy = date.getUTCFullYear();
    let dateCompare = ("" + dd + mm + yyyy);

    let i =0;
    for (i; i < bookingList.length; i++){
        let bookingDate = bookingList[i]['arrival'];
            let bookingUnix = new Date(bookingDate * 1000);
            // Converting timestamp to date
            let bookingDD = bookingUnix.getUTCDate();
            let bookingMM = bookingUnix.getUTCMonth();
            let bookingYYYY = bookingUnix.getUTCFullYear();

            let bookingCompare = ("" + bookingDD + bookingMM + bookingYYYY);

            if(dateCompare == bookingCompare){
                dailyBooking +=1;
            }
    }
    return dailyBooking;
}

function getRevenueInsight(bookingList) {
    let date = new Date();
    let dd = date.getUTCDate();
    // This is 0-11 but it doesn't matter as we are converting the booking date the same way
    let mm = date.getUTCMonth();
    let yyyy = date.getUTCFullYear();
    let dateCompare = ("" + dd + mm + yyyy);
    let revenue = 0;
    let i =0;
    for (i; i < bookingList.length; i++){
        let bookingDate = bookingList[i]['arrival'];
        let bookingUnix = new Date(bookingDate * 1000);
        // Converting timestamp to date
        let bookingDD = bookingUnix.getUTCDate();
        let bookingMM = bookingUnix.getUTCMonth();
        let bookingYYYY = bookingUnix.getUTCFullYear();

        let bookingCompare = ("" + bookingDD + bookingMM + bookingYYYY);

        if(dateCompare == bookingCompare){
            console.log(bookingList[i]['price']);
            revenue += bookingList[i]['price'];
        }
    }
    return revenue;
}

function getAllBookingsForLot() {

}

function processOfferInsights(offerList) {
    let totalVouchers = 0;
    let dailyVouchers = 0;
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
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
};
