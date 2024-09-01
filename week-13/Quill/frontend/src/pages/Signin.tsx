import Review from "../components/Review"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { SignInInput } from "@paulami/medium-common";
import axios from "axios";
import { DATABASE_URL } from "../config";
import Header from "../components/Header";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Password from "../components/Password";

export const Signin = () => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignInInput>({
      email : "",
      password : ""
  })

  const [error, setError] = useState('')

  async function sendRequest(){
    try{
      const response = await axios.post(`${DATABASE_URL}/api/v1/user/signin`, postInputs);
      const token = "Bearer " +response.data.token;
      localStorage.setItem("token", token);
      navigate('/blogs');
    }
    catch(err){
      //@ts-ignore
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
                  <Header heading={"Log in to continue"} subHeading={"Don't have an account?"} linkTxt={"Sign Up"} to={"/signup"} />
                </div>
                <div>
                  <InputField type={"email"} label={"Email"} placeholder="me@example.com" onChange={(e)=>{
                    setPostInputs(c => ({
                      ...c,
                      email : e.target.value
                    }))
                  }} />
                  <Password onChange={(e)=>{
                    setPostInputs(c => ({
                      ...c,
                      password : e.target.value
                    }))
                  }} />
                </div>
                <div>
                  <Button label={"Sign In"} onClick={sendRequest} />
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
  