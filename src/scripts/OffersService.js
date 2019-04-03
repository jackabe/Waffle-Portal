function getOffers() {
    return new Promise(function(resolve, reject) {
        fetch('http://18.188.105.214/getAllOffers', {
            method: 'get',
            config: { headers: {'Content-Type': 'multipart/form-data' }},
        }).then(response => response.json())
            .then(jsonBody => { resolve(jsonBody); })
            .catch(error => {
                reject(error);
            });
    });
}

function getPartners() {
    return new Promise(function(resolve, reject) {
        fetch('http://18.188.105.214/partners/get', {
            method: 'get',
            config: { headers: {'Content-Type': 'multipart/form-data' }},
        }).then(response => response.json())
            .then(jsonBody => { resolve(jsonBody); })
            .catch(error => {
                reject(error);
            });
    });
}

module.exports = {
    getPartners,
    getOffers
};
