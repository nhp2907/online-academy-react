import {User} from "../../../model/User";

export default interface ManagementRoute {
    user?: User

    [key: string]: any
}