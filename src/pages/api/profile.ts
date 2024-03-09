import pkg from 'jsonwebtoken'
import type { APIRoute } from 'astro';

const { verify } = pkg;

export const GET: APIRoute = ({ params, request }) => {

    const token = request.headers.get('cookie')?.split('=')[1]

    if (!token) {
        return new Response("Unauthorized", { status: 401 });

    }

    try {
        const user = verify(token, 'secret') as { user_id: number, email: string, username: string }
        return new Response(JSON.stringify({
            user_id: user.user_id,
            email: user.email,
            username: user.username,
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',

            }
        }
        )
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({
            error: 'error'
        }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

}