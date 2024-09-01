import Review from "../components/Review"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { UpdateUserInput} from "@paulami/medium-common";
import axios from "axios";
import { DATABASE_URL } from "../config";
import Header from "../components/Header";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Password from "../components/Password";

export const UpdateUser = () => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<UpdateUserInput>({
      name : "",
      prevPassword : "",
      newPassword : "",
      about : ""
  })
  const [error, setError] = useState('');

  async function sendRequest(){
    try{
      const response = await axios.put(`${DATABASE_URL}/api/v1/user/update`, postInputs,
      {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
      if(response.data.token){
        const token = "Bearer "+response.data.token;
        localStorage.setItem('token', token);
      }
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
                  <Header heading={"Update information"} />
                </div>
                <div>
                  <InputField type={"text"} label={"Name"} placeholder={"Enter your username"} onChange={(e)=>{
                    setPostInputs(c => ({
                      ...c,
                      name : e.target.value
                    }))
                  }} />
                  <Password label={"Current Password"} onChange={(e)=>{
                    setPostInputs(c => ({
                      ...c,
                      prevPassword : e.target.value
                    }))
                  }} />
                  <Password label={"New Password"} onChange={(e)=>{
                    setPostInputs(c => ({
                      ...c,
                      newPassword : e.target.value
                    }))
                  }} />
                  <div className="overscroll-contain py-2">
                    <label className="text-md font-bold p-1"> About
                      <textarea id="content" name="postContent" rows={28} cols={70} className="outline outline-2 outline-slate-200 rounded-lg m-1 py-2 px-4 text-md text-black w-full h-56" 
                        onChange={(e)=>{
                        setPostInputs(c => ({
                          ...c,
                          about : e.target.value}))
                        }} ></textarea>
                    </label>
                  </div>
                </div>
                <div>
                  <Button label={"Update"} onClick={sendRequest} />
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
  