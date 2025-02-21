import LoggedOut from "../loggedOut/LoggedOut";
import Nav from "../nav/Nav";

export default function SideBar() {
    return (
      <aside className="fixed left-0 h-full w-[15%] bg-orange-400 flex-col ">
        <div className="h-[20%] w-full flex flex-col justify-center items-center ">
            <img src="/logo.png" className="bg-orange-300 p-1 rounded-xl" />
        </div>
        <div className="h-[60%] w-full flex flex-col justify-center items-center">
            <Nav/>
        </div>
        <div className="h-[20%] w-full flex flex-col justify-center items-center">
            <LoggedOut />
        </div>
      </aside>
    );
  }