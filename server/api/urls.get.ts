import { createClient  } from "@supabase/supabase-js"
export default defineEventHandler(async(event) => {
    try {
        const { SUPABASE_URL, SUPABASE_KEY } = process.env
        const sb = createClient(SUPABASE_URL, SUPABASE_KEY)
        const { data, error } = await sb.from("urls").select()
        return {
            status: 200,
       
                data,
                error,
        }

    }
    catch (e) { 
        return {
            status: 500,
            body: {
                message: 'server error',
            },
        }
    }
})