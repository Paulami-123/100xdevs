import { useNavigate } from "react-router-dom"

export default function HomePage(){
    const navigate = useNavigate()
    return(
        <div>
            <div className="relative h-screen w-screen">
                <img className="h-screen w-screen" src="homepage.png" />
                <div className="absolute top-32 w-full flex justify-center">
                    <div className="text-4xl font-bold text-center w-1/2">
                        SAVING FOR A BRIGHTER FUTURE STARTS NOW!
                    </div>
                </div>
                <div className="absolute top-8 right-8">
                    <button className="px-3 py-2 bg-amber-300 rounded-lg mx-2 hover:bg-amber-500 hover:font-bold"
                    onClick={()=>{
                        navigate('/about')
                    }}>
                        About Us
                    </button>
                    <button className="px-3 py-2 bg-amber-300 rounded-lg mx-2 hover:bg-amber-500 hover:font-bold"
                    onClick={()=>{
                        navigate('/signup')
                    }}>
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    )
}