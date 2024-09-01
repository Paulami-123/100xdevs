import Review from "../components/Review"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { SignUpInput } from "@paulami/medium-common";
import axios from "axios";
import { DATABASE_URL } from "../config";
import Header from "../components/Header";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Password from "../components/Password";

export const Signup = () => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignUpInput>({
      email : "",
      name : "",
      password : ""
  })

  const [error, setError] = useState('');

  async function sendRequest(){
    try{
      const response = await axios.post(`${DATABASE_URL}/api/v1/user/signup`, postInputs);
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
                  <Header heading={"Create an account"} subHeading={"Already have an account?"} linkTxt={"Login"} to={"/signin"} />
                </div>
                <div>
                  <InputField type={"text"} label={"Name"} placeholder="Enter your username" onChange={(e)=>{
                    setPostInputs(c => ({
                      ...c,
                      name : e.target.value
                    }))
                  }} />
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
                  <Button label={"Sign Up"} onClick={sendRequest} />
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
  