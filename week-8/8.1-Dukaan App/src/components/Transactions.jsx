export default function Transactions({payouts, refunds}){
  return (
    <div>
      <div className="text-xl font-medium pb-4 pl-5">Transactions | This Month</div>
      <div className="flex justify-start pl-5">
        <div className="bg-neutral-200 text-neutral-500 font-md w-28 h-8 rounded-full flex items-center justify-center cursor-pointer mr-3">
          Payouts({payouts})
        </div>
        <div className="bg-[#146EB4] text-white font-md w-28 h-8 rounded-full flex items-center justify-center cursor-pointer">
          Refunds({refunds})
        </div>
      </div>
    </div>
  )
}