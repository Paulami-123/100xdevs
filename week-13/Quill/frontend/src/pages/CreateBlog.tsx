import AppBar from "../components/AppBar";
import { EditBlog } from "../components/EditBlog";

export default function CreateBlog(){

    return <div>
        <AppBar />
        <EditBlog type={"post"} />
    </div>
}