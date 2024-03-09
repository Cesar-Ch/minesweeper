import type { APIRoute } from 'astro';
import pkg from 'jsonwebtoken';
import cookie from 'cookie';

const { verify } = pkg;

export const POST: APIRoute = async ({ request }) => {
    const token = request.headers.get('cookie')?.split('=')[1]

    if (!token) {
        return new Response(JSON.stringify({
            error: 'Not Token'
        }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    try {
        verify(token, import.meta.env.JWT_SECRET)
        const serialized = cookie.serialize('token', null, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 0,
            path: '/',
        })
        return new Response(JSON.stringify({
            message: 'Logout'
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Set-Cookie': `${serialized}`
            }
        })
    } catch (error) {

        return new Response(JSON.stringify({

            error: 'Not Token'
        }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json'
            }
        })

    }
}