function getBookingsForLot(lotId) {
    return new Promise(function(resolve, reject) {
        let formData = new FormData();
        formData.append('lot_id', lotId);
        fetch('http://127.0.0.1:8000/getBookingsForLot', {
            method: 'post',
            config: { headers: {'Content-Type': 'multipart/form-data' }},
            body: formData
        }).then(response => response.json())
        .then(jsonBody => { resolve(jsonBody); })
        .catch(error => {
            const { code, message } = error;
            reject(error);
        });
    });
}

module.exports = {
    getBookingsForLot
};
