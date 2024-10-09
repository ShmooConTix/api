import { db } from "../../db";

export function getUsers() {
    const users = db.prepare("SELECT * FROM users").all();
    
    return users.map((user: any) => {
        user.status = "Active";
        return user;
    });
}