import { useNavigate } from "react-router-dom"
import Bullet from "../components/Bullet"

export default function AboutUs(){
    const navigate = useNavigate()
    return(
        <div>
            <div className="relative h-screen w-screen">
                <img className="h-screen w-screen" src="aboutpage.png" />
                <div className="absolute top-32 w-1/2 h-3/4 pl-24 grid grid-rows-4">
                    <div className="text-4xl font-bold py-6">
                        Welcome to PayZil!
                    </div>
                    <div>
                        <div className="flex gap-2 items-center">
                            <Bullet color={'blue'} />
                            <div className="font-bold text-xl">Our Story</div>
                        </div>
                        <div className="font-bold">
                            At PayZil, we're dedicated to helping our customers achieve their financial goals. 
                            Founded in 1960, our bank has a long history of serving the local community with integrity, 
                            expertise, and a commitment to excellence.
                        </div>
                    </div>
                    <div>
                        <div className="flex gap-2 items-center">
                            <Bullet color={'green'} />
                            <div className="font-bold text-xl">Our Values</div>
                        </div>
                        <div className="font-bold">
                            At PayZil, we're guided by a set of core values that shape our decisions and actions. 
                            We believe in putting our customers first, being transparent and honest in all our interactions, 
                            and continually innovating to stay ahead of the curve.
                        </div>
                    </div>
                    <div>
                        <div className="flex gap-2 items-center">
                            <Bullet color={'purple'} />
                            <div className="font-bold text-xl">Our Mission</div>
                        </div>
                        <div className="font-bold">
                            Our mission is to provide exceptional banking services that empower our customers to achieve 
                            their financial goals. We're committed to building strong relationships with our customers, 
                            supporting the local community, and promoting financial inclusion
                        </div>
                    </div>
                </div>
                <div className="absolute top-8 right-8">
                    <button className="px-3 py-2 bg-amber-300 rounded-lg mx-2 hover:bg-amber-500 hover:font-bold"
                    onClick={()=>{
                        navigate('/')
                    }}>
                        Home
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