import { useParams } from "react-router-dom";
import { EditBlog } from "../components/EditBlog"
import { useBlog } from "../hooks";
import AppBar from "../components/AppBar";
import { Spinner } from "../components/Spinner";

export const UpdateBlog = () => {
  const { id } = useParams();
  const {loading, blog} = useBlog({
      id: id || ""
  });
  return( 
  <div>
  <AppBar />
    {(loading || (!blog)) ? 
      <div className="h-screen flex flex-col justify-center">
        <div className="flex justify-center">
          <Spinner />
        </div>
      </div>
      : 
      <EditBlog type={"put"} blog={blog} />
    }
  </div>
)}