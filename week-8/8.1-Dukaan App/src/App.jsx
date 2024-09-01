import Footer from "./components/Footer"
import Overview from "./components/Overview"
import SideBar from "./components/SideBar"
import Table from "./components/Table"
import TopBar from "./components/TopBar"
import Transactions from "./components/Transactions"



function App() {
  return (
    <div className="bg-slate-50 w-screen">
      <div>
        <SideBar credit={"222.10"} />
      </div>
        <div className="bg-slate-50">
          <div className="m-5 border-b border-gray-150 sm:pl-64 bg-[#FFFFFF]">
            <TopBar />
          </div>
          <div className="sm:ml-64 grid gap-8">
            <Overview />
          <div className="grid gap-6 bg-slate-50">
            <Transactions payouts={22} refunds={6}/>
            <Table />
          </div>
          <Footer />
          </div>
        </div>
     </div>
  )
}



export default App
