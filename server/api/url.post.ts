import { createClient  } from "@supabase/supabase-js"
import * as sh from 'shorthash'

interface URLObject {
    url: string
    hash: string
    created_at: string
    id: number
}

export default defineEventHandler(async (event) => {
    const body = await useBody(event)

    const { SUPABASE_URL, SUPABASE_KEY } = process.env
    try {
        const sb = createClient(SUPABASE_URL, SUPABASE_KEY)

        
        let sb_resp;
        
        sb_resp = await sb.from("urls").select().eq('url', body.url)
        if (sb_resp.data.length > 0) {
            return {
                status: 200,
                body: {
                    message: 'url already exists',
                    data: sb_resp.data[0],
                },
                data: sb_resp.data[0],
            }
        }

        // console.log(SUPABASE_URL, SUPABASE_KEY)
        sb_resp = await sb.from("urls").insert([{
            url: body.url,
            created_at: new Date(),
            hash: sh.unique(body.url),
        }])

        const url: URLObject = sb_resp.data[0]


        return {
            status: 200,
            data: url,
            message: 'url created',
        }
    } catch (e) {
        return {
            status: 500,
            body: {
                message: e.message,
            },
            error: e

        }
    }
})