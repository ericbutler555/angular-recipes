export class User {

	constructor(
		public id: string,
		public email: string,
		private _token: string,
		private _tokenExpirationDate: Date
	) {}

	// provide a little security by making the _token value gettable but not (re-)settable:
	get token() {
		// only return the token if it hasn't expired
		if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) { return null; }
		return this._token;
	}
}
