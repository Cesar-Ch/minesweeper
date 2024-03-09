import { addUser } from "../../db/client";
import { type APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    try {
        const { credentials } = await request.json()
        console.log(credentials)
        await addUser(credentials)
    } catch (e) {
        return new Response(
            'Internal Server Error', { status: 500 }
        )
    }

    return new Response(
        "ok", { status: 200 }
    )
}