export const BlogHeader = ()=>{
    return(
        <div className="h-screem flex flex-col items-center justify-start py-16">
            <div className="w-1/2 border-b border-slate-300 flex justify start gap-5 items-center">
                <button className="text-slate-300 text-4xl items-center focus:text-black">+</button>
                <button className="text-slate-300 text-xl items-center focus:text-black">My Blogs</button>
                <button className="text-slate-300 text-xl items-center focus:text-black">All Blogs</button>
            </div>
        </div>
    )
}