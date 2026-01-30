import { Roles } from "src/users/enums/user.enum"


export class User {
    email: string
    password: string
    id: string
    role: Roles
}