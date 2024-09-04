"use client";

import { useSession } from "next-auth/react";

export default function ProfileBtn() {
    
    const session = useSession();

    if(!session.data?.user){
        return null;
    }

    return <div class="flex items-center gap-4">
        {session?.data?.user.image && <img class="w-10 h-10 rounded-full" src={session?.data?.user?.image} alt="" />}
        <div class="font-medium">
            <div>{session.data?.user?.name}</div>
        </div>
    </div>
}