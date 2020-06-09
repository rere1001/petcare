import _ from "lodash";
import base64 from "base-64";

export class RestConnection {
	constructor(baseUrl, setAuthenticated, authData) {
		this.baseUrl = baseUrl;
		this.setAuthenticated = setAuthenticated;
		this.authData = authData;
	}

	readAll = () => this.performFetch(`?time=${new Date().getTime()}`);

	insertOrUpdate = (entity) =>
		this.performFetch(_.isUndefined(entity.id) ? "add/" : `edit/${entity.id}`, entity);

	deleteEntity = (id) => this.performFetch(`delete/${id}`);

	performFetch = (subUrl, body) =>
		fetch(this.baseUrl + subUrl, {
			method: _.isUndefined(body) ? "GET" : "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: !this.authData
					? ""
					: `Basic ${base64.encode(`${this.authData.email}:${this.authData.password}`)}`
			},
			body: JSON.stringify(body)
		})
			.then((response) => {
				if (response.status === 401) {
					this.setAuthenticated(false);
					Promise.reject(new Error("Unauthorized")).catch((error) => console.error(error));
				}
				return response;
			})
			.then((response) => response.json())
			.catch((error) => {
				console.error(error);
				throw error;
			});
}
