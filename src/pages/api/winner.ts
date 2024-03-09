import { addWin } from "../../db/client";
import { type APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    try {
        const { user,time,selectedValue } = await request.json()
        console.log(user,time ,selectedValue)
        await addWin( user,time,selectedValue )
    }
    catch (e) {
        return new Response(
            "error", { status: 500 })
    }

    return new Response(
        "ok", { status: 200 }
    )
}