import BlueCard from "./BlueCard";
import RevenueCard from "./RevenueCard";

export default function Overview(){

    return(
        <div className="grid gap-6 p-5 bg-slate-50">
            <div className="flex justify-between items-center">
                <div className="text-xl font-medium">Overview</div>
                <div className="grid grid-flow-col items-center gap-2 h-9 pl-3.5 pr-3.5 rounded border border-black-150 cursor-pointer">
                    <p>This month</p>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <BlueCard title={"Next payout"} amount={"2,312.23"} orders={23} />
                <RevenueCard title={"Amount Pending"} amount={"92,312.20"} orders={13} />
                <RevenueCard title={"Amount Processed"} amount={"23,92,312.19"} />
            </div>
        </div>
    )
}