import { useRecoilValue } from "recoil";
import { ReviewsData } from "../ReviewData"
import { id } from "../atoms/atoms";

export default function Review(){
  const idx = useRecoilValue(id);
  const reviewData = ReviewsData[idx];
  return (
      <div>
          <div className="h-screen bg-gray-100 flex justify-center flex-cols">
            <div className="content-center max-w-sm">
              <div className="font-bold text-2xl">
                "{reviewData.comment}"
              </div>
              <div className="py-4">
                <div className="font-bold text-md">
                  {reviewData.name}
                </div>
                <div className="text-slate-400 text-sm">
                  {reviewData.about}
                </div>
              </div>
            </div>
          </div>
      </div>
  )
}