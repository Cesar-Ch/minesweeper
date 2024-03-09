import { type APIRoute } from "astro";
import { getWinners } from "../../db/client";



export const GET: APIRoute = async ({ params, request }) => {

    const url = new URL(request.url);
    const level = url.searchParams.get('level');
    const winners = await getWinners(level);
    
    const rowWinner = winners.rows.map(row => { 
        return {username : row.username, time: row.time, level: row.level}
    })
    console.log(rowWinner)
    return new Response(JSON.stringify({
        rowWinner
    }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });


}