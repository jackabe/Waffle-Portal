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

function mapBookingsToLot(markers, lots){
    let i=0;
    let lotDict = {}

    for(i; i < lots.length; i++){
        let lotName = lots[i]['details']['name'];
        lotDict[lotName] = 0;
    }

    let x=0;
    for(x; x < markers.length; x++){
        // Receiving a list of markers with bookings already mapped.
        // Therefore checking lot name and then appending each booking accordingly
        let markerBooking = markers[x]['bookings'];
        // Check if the Lot has Bookings first, else code crash as lot_name is undefined
        if (markerBooking.length > 0){
            let markerLot = markers[x]['bookings'][0]['lot_name'];
            if (markerLot in lotDict){
                for (let y =0; y < markerBooking.length; y++){
                    // lotDict[markerLot] = lotDict[markerLot].concat(markerBooking[y]);
                    lotDict[markerLot] += 1
                }
            }
        }
    }

    return lotDict;
}

module.exports = {
    getBookingsForLot,
    formatBookings,
    mapBookingsToLot
};
