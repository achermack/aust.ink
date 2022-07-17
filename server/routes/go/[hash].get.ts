
import { createClient  } from "@supabase/supabase-js"



export default defineEventHandler(async (event) => {
    const hash = event.context.params.hash

    const { SUPABASE_URL, SUPABASE_KEY } = process.env
    try {
        const sb = createClient(SUPABASE_URL, SUPABASE_KEY)


        const { data, error } = await sb.from("urls").select('url').eq('hash', hash)

        if (data.length === 0) {
            return {
                status: 404,
                body: {
                    message: 'invalid hash',
                },
            }
        }
    
         console.log(data)
         redir(event.res, data[0].url)
    }
        catch (e) {
            return {
                status: 500,
                body: {
                    message: e.message,
                },  
            }
        }
    })


function redir(res, loc) {
    res.writeHead(301, {
        Location: loc,
    })
    res.end()
}