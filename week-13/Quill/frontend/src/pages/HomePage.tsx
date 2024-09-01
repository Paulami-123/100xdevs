import { useNavigate } from "react-router-dom"

export default function HomePage(){
    const navigate = useNavigate()
    return(
        <div>
            <div className="relative h-screen w-screen">
                <img className="h-screen w-screen" src="https://static.vecteezy.com/system/resources/previews/016/675/098/large_2x/hand-drawn-oil-painting-abstract-art-background-oil-painting-on-canvas-color-texture-fragment-of-artwork-paint-spots-paint-brush-brush-modern-art-contemporary-art-colorful-canvas-free-photo.jpg" />
                <div className="absolute top-32 w-full flex justify-center">
                  <div className="w-1/2">
                    <div className="text-6xl font-bold text-center text-white py-8">
                        WRITING YOUR HEART OUT!
                    </div>
                    <div className="text-white font-bold text-2xl text-center py-8">Stories to make you laugh, cry, and think</div>
                    <div className="flex justify-center">
                        <button className="w-48 h-16 outline outline-pink-300 items-center text-lg text-white rounded-lg hover:outline-amber-500 hover:font-bold"
                        onClick={()=>{
                            navigate('/signup')
                        }}>
                            Get Started
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
  }
  