export function PrimaryBtn({ children, onClick } : {
    children : React.ReactNode,
    onClick : () => void
}){
    return <button 
    onClick={onClick}
    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
        {children}
    </button> 
}