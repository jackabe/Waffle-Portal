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

module.exports = {
    getBookingsForLot,
    formatBookings
};
