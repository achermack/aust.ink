import { sb } from "../supabase"
export default defineEventHandler(async(event) => {
    try {
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