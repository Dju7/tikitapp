import SideBar from "../component/sidebar/SideBar";

export const metadata = {
  title: "TikitApp-Board",
  description: "application de ticket",
};

export default function BoardLayout({ children }) {
  return (
   
      <div className=" h-screen w-full flex ">
        <SideBar />
        <div className="ml-[15%] h-screen w-[85%]">
         {children}
        </div>
      </div>
   
  );
}
