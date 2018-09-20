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

	static handleErrors(response) {
		if (!response.ok) {
			throw Error(response.statusText);
		}
		return response;
	}

	static getTokenFromLocalStorage() {
		return localStorage.getItem('token');
	}

	static isUserLogged() {
		if (localStorage.getItem('token')) {
			return true
		} else {
			return false
		}
	}

	static handleLogOut() {
		localStorage.clear();
	}
}
