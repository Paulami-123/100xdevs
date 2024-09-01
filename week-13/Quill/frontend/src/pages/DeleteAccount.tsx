import Review from "../components/Review"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import axios from "axios";
import { DATABASE_URL } from "../config";
import Header from "../components/Header";
import Button from "../components/Button";
import Password from "../components/Password";

export const DeleteAccount = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function sendRequest(){
    try{
        await axios.delete(`${DATABASE_URL}/api/v1/user/delete`, {
            headers: {
              Authorization: localStorage.getItem("token")
            },
            data: {
              password : password
            }
          });
        localStorage.clear();
        navigate('/signup');
    }
    catch(err){
      // @ts-ignore
      setError(err.response.data.error)
    }
  }
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <div className="h-screen flex justify-center flex-cols">
            <div className="flex justify-center">
              <div className="content-center max-w-sm">
                <div className="p-2">
                  <Header heading={"Sorry to see you go"}/>
                </div>
                <div>
                  
                <Password onChange={(e)=>{
                    setPassword(e.target.value)
                    }
                  } />
                </div>
                <div>
                  <Button label={"Delete Account"} onClick={sendRequest} />
                </div>
                {error ? <div className="text-sm font-bold text-red-400">{error}</div> : null}
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block">
          <Review />
        </div>
      </div>
    </div>
  )
}
  