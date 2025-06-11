'use client'

import { useRouter } from "next/navigation"

export default function LogoutButton(){
    const router = useRouter()

    const handleLogout = async () => {
        try{
            const res = await fetch('api/logout')
            if(res.ok){
                router.push('auth')
            }
        }catch(error){
            console.log('loggout failed',error)
        }
    }

    return(
        <button onClick={handleLogout}>
            خروج
        </button>
    )
}