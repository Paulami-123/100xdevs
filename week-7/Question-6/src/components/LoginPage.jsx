import { useNavigate } from "react-router-dom"

export default function LoginPage(){

  const navigate = useNavigate();
  
    return <div>
      <div className="flex justify-center px-72 py-64">
        <div className="outline outline-black rounded-lg p-4 bg-black text-white w-96 px-8">
          <div className="text-2xl flex justify-center pb-4">
            Login via OTP
          </div>
          <div className="py-4">
            <input className="outline outline-1 outline-white rounded-lg bg-black text-white px-6 py-2 w-full" 
            maxLength={10} placeholder="Enter your mobile number" />
          </div>
          <div className="flex justify-center py-4">
            <button className="bg-black text-white px-6 py-2 outline outline-1 outline-white rounded-lg"
            onClick={()=>{
              navigate("/verification");
            }}>Send OTP</button>
          </div>
        </div>
      </div>
    </div>
  }