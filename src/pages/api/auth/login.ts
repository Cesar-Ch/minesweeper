import { type APIRoute } from "astro";
import jwt from 'jsonwebtoken'



export const POST: APIRoute = async ({ request }) => {

    const { credentials } = await request.json();
    console.log(credentials);

    if (credentials.email === 'admin@local.com' && credentials.password === 'admin'){
        jwt.sign
    }

    return new Response(JSON.stringify({
        message: "Success"
    }))
}