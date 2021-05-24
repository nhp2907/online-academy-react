import {User} from "../model/User";

export default interface UserLoginResponseDto {
    token: string;
    user: User
}