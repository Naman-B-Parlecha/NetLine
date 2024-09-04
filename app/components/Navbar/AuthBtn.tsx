"use client";

import { signOut, useSession } from "next-auth/react";
import { PrimaryBtn } from "../Buttons";
import { signIn } from "next-auth/react";

export default function AuthBtn(){

    const session = useSession();

    return <PrimaryBtn onClick={()=>{
        session.data ? signOut() : signIn("google")
    }}>
        {
            session.data ? "Sign Out" : "Sign in with Google"
        }
    </PrimaryBtn>
}