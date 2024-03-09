import { type APIRoute } from "astro";
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'
import { getUser } from "../../../db/client";


export const POST: APIRoute = async ({ request }) => {

    const { credentials } = await request.json();
    const user = await getUser(credentials.email)
    console.log(user.rows[0]);
    console.log(credentials);

    if (credentials.email === user.rows[0].email && credentials.password === user.rows[0].password) {
        const token = jwt.sign({
            user_id: user.rows[0].user_id,
            email: user.rows[0].email,
            username: user.rows[0].username,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30)
        },import.meta.env.JWT_SECRET)
        const serialized = serialize('token', token, {
            httpOnly: true,
            secure:import.meta.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 30,
            path: '/',
        })

        return new Response(
            "ok", {
            headers: {
                'Content-Type': 'application/json',
                'Set-Cookie': `${serialized}`
            }
        }
        )
    }
    return new Response(
        "error", {
        status: 401
    }
    )

}