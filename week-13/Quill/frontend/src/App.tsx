import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { Blog } from "./pages/Blog"
import { UpdateBlog } from "./pages/UpdateBlog"
import CreateBlog from "./pages/CreateBlog"
import { DeleteAccount } from "./pages/DeleteAccount"
import { UpdateUser } from "./pages/UpdateUser"
import { RecoilRoot } from "recoil"
import AllBlogs from "./pages/AllBlogs"
import MyBlogs from "./pages/MyBlogs"
import HomePage from "./pages/HomePage"
function App() {

  return (
    <RecoilRoot>
    <BrowserRouter>
    <Routes>
      <Route path={'/'} element={<HomePage />} />
      <Route path={'/signup'} element={<Signup />} />
      <Route path={'/signin'} element={<Signin />} />
      <Route path={'/blog/:id'} element={<Blog />} />
      <Route path={'/blogs'} element={<AllBlogs />} />
      <Route path={'/myblogs'} element={<MyBlogs />} />
      <Route path={'/blog/edit/:id'} element={<UpdateBlog />} />
      <Route path={'/blog/create'} element={<CreateBlog />} />
      <Route path={'/delete'} element={<DeleteAccount />} />
      <Route path={'/update'} element={<UpdateUser />} />
    </Routes>
    </BrowserRouter>
    </RecoilRoot>
  )
}


export default App