export default function InputBox({label, placeholder, onChange}){
    return (
        <div className="px-5">
            <div className="text-sm font-bold py-2 text-left">
                {label}
            </div>
            <div>
                <input onChange={onChange} placeholder={placeholder} className="w-full text-sm border border-slate-300 rounded px-2 py-1" />
            </div>
        </div>
    )
}