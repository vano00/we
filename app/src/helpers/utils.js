export default class Utils {
    static getCurrentPosition(position) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((position) => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            }, () => {
                resolve(
                    position = null
                );
            });
        })
    };
}
