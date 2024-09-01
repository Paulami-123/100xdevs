import { useState } from "react"

const words = ['believe', 'you', 'can', 'and', 'you', 'are', 'halfway', 'there'];

export default function ParaGenerator(){
    const [length, setLength] = useState(0);
    const [para, setPara] = useState("");
    const generate = () => {
      let randomText = '';
      for (let i=0; i<length; i++){
        const idx = Math.floor(Math.random()*words.length);
        randomText += ' '+words[idx];
      }
      console.log(randomText);
      setPara(randomText);
    }
  
    return <div>
      <div className="flex justify-center text-4xl font-bold py-5">
        Paragraph Generator
      </div>
      <div className="flex w-full justify-center p-4">
        <input type="text" placeholder="Enter number of words" onChange={(e)=>{
          setLength(Number(e.target.value));
        }} className="w-1/3 bg-inherit border border-slate-200 p-3 rounded-lg" />
        <button onClick={generate} className="bg-black text-slate-50 ml-5 px-4 rounded-lg">Generate</button>
      </div>
      <div>
        <div className="px-6">{para}</div>
      </div>
    </div>
  }