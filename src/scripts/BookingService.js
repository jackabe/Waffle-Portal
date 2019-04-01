function getBookingsForLot(lotId) {
    return new Promise(function(resolve, reject) {
        let formData = new FormData();
        formData.append('lot_id', lotId);
        fetch('http://18.188.105.214/getBookingsForLot', {
            method: 'post',
            config: { headers: {'Content-Type': 'multipart/form-data' }},
            body: formData
        }).then(response => response.json())
        .then(jsonBody => { resolve(jsonBody); })
        .catch(error => {
            reject(error);
        });
    });
}

function formatBookings(bookings) {
    let bookings_list = [];
    let i = 0;
    for (i; i < bookings.length; i++) {
        let booking = 0;
        for (booking; booking < bookings[i].length; booking++) {
            bookings_list.push(bookings[i][booking])
        }
    }
    return bookings_list;
}

function mapBookingsToLot(bookings, lots){
    let i=0;
    let lotDict = {}

    for(i; i < lots.length; i++){
        let lotName = lots[i]['details']['name'];
        lotDict.lotName = [];
    }

    let x=0;
    for(x; x < bookings.length; x++){
        let booking = bookings[x];
        let bookingLot = booking['lot_name'];
        if(bookingLot in lotDict){
            lotDict[bookingLot] = lotDict[bookingLot].concat(booking);
        }
    }
    return lotDict;
}

module.exports = {
    getBookingsForLot,
    formatBookings
};
