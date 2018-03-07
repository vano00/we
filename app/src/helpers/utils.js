export default class Utils {
    static getCurrentPosition(position) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((position) => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            }, () => {
                resolve({
                    lat: 46.932674,
                    lng:  8.311444
                });
            });
        })
    };
}
