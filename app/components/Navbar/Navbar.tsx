import AuthBtn from "./AuthBtn";
import ProfileBtn from "./ProfileBtn";

export default function Navbar(){
    
    return <nav className="flex justify-between items-center p-5 border-b border-black">
        <div>
            Product Name
        </div>
        <div className="flex gap-5 text-black">
            <ProfileBtn />
            <AuthBtn />
        </div>
    </nav>
}