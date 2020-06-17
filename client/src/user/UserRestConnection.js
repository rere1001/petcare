import { RestConnection } from "../common/RestConnection";

export class UserRestConnection extends RestConnection {
	userLogin = (user) => this.performFetch("login/", user);
}
