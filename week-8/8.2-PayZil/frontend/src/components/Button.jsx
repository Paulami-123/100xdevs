export default function Button({label, onClick}){
    return (
        <div className="p-5">
            <button onClick={onClick} className="px-5 py-2.5 rounded w-full rounded bg-slate-800 cursor-pointer text-[#FFFFFF] hover:bg-slate-950 text-sm">
                {label}
            </button>
        </div>
    )
}