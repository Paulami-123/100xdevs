import ProfilePicture from "./ProfilePicture";

export default function CoverImage(){
    return <div>
        <div className="pb-32">
            <div className="relative">
                <img className="bg-cover w-full h-72" src="https://wallpapers.com/images/hd/wide-blue-sky-anime-4k-bvifkq0kqnud7sl3.jpg" />
            </div>
            <ProfilePicture />
        </div>
        <div className="pb-24">
            <div className="flex items-center justify-center"> 
                <div className="font-bold text-2xl mr-3">Nobita Nobi</div>
                <div className="font-medium text-slate-400 text-xl">10</div>
            </div>
            <div className="flex justify-center">
                <div className="font-medium text-slate-400 text-xl">Tokyo</div>
            </div>
        </div>
        <div class="flex-grow border-t border-slate-400"></div>
        <div className="pt-16 items-center">
            <div className="flex justify-evenly">
                <div className="grid grid-rows-4 text-center">
                    <div className="font-bold text-3xl py-1">80K</div>
                    <div className="text-md text-slate-400">Followers</div>
                </div>
                <div className="grid grid-rows-4 text-center">
                    <div className="font-bold text-3xl py-1">803K</div>
                    <div className="text-md text-slate-400">Likes</div>
                </div>
                <div className="grid grid-rows-4 text-center">
                    <div className="font-bold text-3xl py-1">1.4K</div>
                    <div className="text-md text-slate-400">Photos</div>
                </div>
            </div>
        </div>
    </div>
}