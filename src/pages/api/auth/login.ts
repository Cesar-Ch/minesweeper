import { type APIRoute } from "astro";
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'


export const POST: APIRoute = async ({ request }) => {

    const { credentials } = await request.json();
    console.log(credentials);

    if (credentials.email === 'admin@local.com' && credentials.password === 'admin') {
        const token = jwt.sign({
            id: 1,
            email: 'admin@local.com',
            username: 'Player1',
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30)
        }, 'secret')
        const serialized = serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
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