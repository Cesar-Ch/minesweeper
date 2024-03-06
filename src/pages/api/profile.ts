import pkg from 'jsonwebtoken'
import type { APIRoute } from 'astro';

const { verify } = pkg;

export const GET: APIRoute = ({ params, request }) => {

    const token = request.headers.get('cookie')?.split('=')[1]

    try {
        const user = verify(token, 'secret')
        return new Response(JSON.stringify({
            email: user.email,
            username: user.username,
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
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