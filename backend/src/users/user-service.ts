import userModel from "./user-model";
import { Users } from "./user-types";

export class UserService {
    async register(data: Users) {
        return await userModel.create(data);
    }
}
