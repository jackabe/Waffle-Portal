function getLotDetails(data) {
    let details = data[0];
    return {
        name: details['name'],
        capacity: details['capacity'],
        lat: details['latitude'],
        long: details['longitude'],
        lot_id: details['id'],
        favourite: false
    };
}

// function addNewLot(){
//     const db = firebase.firestore();
//     db.settings({
//         timestampsInSnapshots: true
//     });
//     const userRef = db.collection(“parking_lots”).add({
//         fullname: this.state.fullname,
//         email: this.state.email
//     });
// }

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

module.exports = {
    getLotDetails,
    getLotPrices,
    getLotSpaces
};
