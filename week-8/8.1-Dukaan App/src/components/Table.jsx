import TableHeader from "./TableHeader"
import { data } from "../OrderData/data"


let GLOBAL_ID = 0;

export default function Table(){
    return(
        <div className="mx-6 my-3 bg-[#FFFFFF] rounded p-4 pl-2">
            <div>
                <TableHeader />
            </div>
            <div className="mt-5 justify-center">
                <table className="min-w-full text-sm text-left rtl:text-right text-neutral-400 justify-center">
                    <thead>
                        <tr>
                            <th className="px-3 py-2.5 text-left text-sm tracking-wider">ORDER ID</th>
                            <th className="px-3 py-2.5 text-left text-sm tracking-wider">STATUS</th>
                            <th className="px-3 py-2.5 text-left text-sm tracking-wider">TRANSACTION ID</th>
                            <th className="px-3 py-2.5 text-left text-sm tracking-wider">REFUND DATA</th>
                            <th className="px-3 py-2.5 text-right text-sm tracking-wider">ORDER AMOUNT</th>
                        </tr>
                    </thead>
                    {data.map((order)=>{
                        return (
                            <tbody key={GLOBAL_ID++} className="divide-slate-400">
                                <tr className="text-sm relative bg-white border-b">
                                    <td className="px-3 py-2.5 whitespace-nowrap font-medium text-sky-600">
                                        #{order.id}
                                    </td>
                                    <td className="px-3 py-2.5 whitespace-nowrap flex items-center gap-1.5 text-gray-600">                                    
                                        { (order.status === "Successful") && <div className='h-2.5 w-2.5 rounded-full bg-green-500'/>}
                                        { (order.status === "Processing") && <div className='h-2.5 w-2.5 rounded-full bg-gray-400'/>}
                                        { (order.status === "Failed") && <div className='h-2.5 w-2.5 rounded-full bg-red-500'/>}
                                        {order.status}
                                    </td>
                                    <td className="px-3 py-2.5 whitespace-nowrap text-gray-600">
                                        {order.transactionId}
                                    </td>
                                    <td className="px-3 py-2.5 whitespace-nowrap text-gray-600">
                                        {order.refundDate}
                                    </td>
                                    <td className="px-3 py-2.5 whitespace-nowrap text-right text-gray-700">
                                        {order.amount}
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })}
                </table>
            </div>
        </div>
    )
}