import { createClient } from "@libsql/client";

type User = {
    name: string,
    lastname: string,
    username: string,
    email: string,
    password: string,
}

const client = createClient({
    url: import.meta.env.DATABASE_URL ?? "",
    authToken: import.meta.env.DATABASE_AUTH_TOKEN ?? "",
})



export const addUser = async (user: User) => {

    const sql = `INSERT INTO Users (name, lastname, username, email, password) VALUES (?,?,?,?,?)`

    const userData = [
        user.name,
        user.lastname,
        user.username,
        user.email,
        user.password
    ]

    const result = await client.execute({ sql: sql, args: userData });

    return result
}


export const getUser = async (email: string) => {
    const sql = `SELECT * FROM Users WHERE email = ?`

    const result = await client.execute({ sql: sql, args: [email] });

    return result
}

export const addWin = async (user, time: string, selectedValue: string) => {
    const sql = `INSERT INTO Scores (user_id,username,time,level) VALUES (?,?,?,?)`

    const winnerData = [user.user_id, user.username, time, selectedValue]

    const result = await client.execute({ sql: sql, args: winnerData });

    return result
}

export const getWinners = async (selectedValue: string) => {
    const sql = `SELECT * FROM Scores WHERE level = ? ORDER BY time ASC LIMIT 10`
    const result = await client.execute({ sql: sql, args: [selectedValue] });
    return result
}