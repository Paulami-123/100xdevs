import { useRef } from "react"

export default function VerificationPage(){
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  
  return <div>
    <div className="flex justify-center px-72 py-64">
      <div className="outline outline-black rounded-lg p-4 bg-black text-white w-96 px-8">
        <div className="text-2xl flex justify-center pb-4">
          Login via OTP
        </div>
        <div className="py-4 flex justify-center items-center">
          {inputRefs.map((el, idx) => {
            return (
              <input className="w-8 mx-4 rounded-lg text-white bg-black outline outline-1 outline-white text-center py-1"
             type='text' key={idx} ref={el} maxLength={1} 
             onChange={(e)=>{
              if(e.target.value.length===1 && idx<inputRefs.length-1){
                inputRefs[idx+1].current.focus();
              }
              else if(e.target.value.length===0 && idx>0){
                inputRefs[idx-1].current.focus();
              }
            }} />
            )
          })}
        </div>
        <div className="flex justify-center py-4">
          <button className="bg-black text-white px-6 py-2 outline outline-1 outline-white rounded-lg" onClick={()=>{
            alert('Login successful.');
          }}>Login</button>
        </div>
      </div>
    </div>
  </div>
}