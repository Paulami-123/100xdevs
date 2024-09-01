import { useState } from "react"
import Background from "./Background";

let GLOBAL_ID = 1;

// const colors = [ 'pink', 'red', 'sky', 'cyan', 'teal', 'lime', 'yellow', 'default' ];
const colors = [{
    color: 'Red',
    shade: '#dc2626'
    }, {
    color: 'Yellow',
    shade: '#fef08a'
    }, {
    color: 'Lime',
    shade: '#bef264'
    }, {
    color: 'Teal',
    shade: '#99f6e4'
    }, {
    color: 'Cyan',
    shade: '#a5f3fc'
    }, {
    color: 'Sky',
    shade: '#38bdf8'
    }, {
    color: 'Pink',
    shade: '#f472b6'
    }, {
    color: 'Default',
    shade: '#ffffff'
  }]

export default function ColorPalette(){

    const [bgColor, setBgColor] = useState('#ffffff');

    return <div>
        <Background color={bgColor} />
        <div className="absolute inset-x-0 bottom-5 mx-64 px-56">
            <div className="rounded-lg bg-slate-100 py-3 shadow-lg bg-default">
                <div className="flex justify-evenly">
                    {colors.map((el) => {
                        return (
                            <button key={el.color} className="px-5 py-2 rounded-lg" 
                            style={{ background: el.shade }} 
                            onClick={()=>{
                                setBgColor(el.shade)
                                console.log(el.shade);
                            }}>{el.color}</button>
                        )
                    })}
                </div>
            </div>
        </div>
    </div>
}