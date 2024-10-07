import { clearAllUserErrors, logout } from "@/store/slices/userSlice";
import {
   FolderGit,
   History,
   Home,
   LayoutGrid,
   LogOut,
   MessageSquare,
   Package,
   Package2,
   PanelLeft,
   PencilRuler,
   User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomTooltipProvider from "./sub-components/CustomTooltipProvider";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Dashboard from "./sub-components/Dashboard";
import AddProject from "./sub-components/AddProject";
import AddSkill from "./sub-components/AddSkill";
import AddApplication from "./sub-components/AddApplication";
import AddTimeline from "./sub-components/AddTimeline";
import Messages from "./sub-components/Messages";
import Account from "./sub-components/Account";

const HomePage = () => {
   const [active, setActive] = useState("Dashboard");

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { isAuthenticated, error, user } = useSelector((state) => state.user);

   const handleLogout = () => {
      dispatch(logout());
      toast.success("Logged Out");
   };

   useEffect(() => {
      if (error) {
         toast.error(error);
         dispatch(clearAllUserErrors());
      }
      if (!isAuthenticated) {
         navigate("/login");
      }
   }, [isAuthenticated]);

   const options = [
      {
         name: "Dashboard",
         icon: Home,
         component: <Dashboard />,
      },
      {
         name: "Add Projects",
         icon: FolderGit,
         component: <AddProject />,
      },
      {
         name: "Add Skills",
         icon: PencilRuler,
         component: <AddSkill />,
      },
      {
         name: "Add Applications",
         icon: LayoutGrid,
         component: <AddApplication />,
      },
      {
         name: "Add Timelines",
         icon: History,
         component: <AddTimeline />,
      },
      {
         name: "Messages",
         icon: MessageSquare,
         component: <Messages />,
      },
      {
         name: "Account",
         icon: User,
         component: <Account />,
      },
   ];

   const linkOptions = [
      {
         name: "Dashboard",
         icon: Home,
      },
      {
         name: "Add Projects",
         icon: FolderGit,
      },
      {
         name: "Add Skills",
         icon: PencilRuler,
      },
      {
         name: "Add Applications",
         icon: LayoutGrid,
      },
      {
         name: "Account",
         icon: User,
      },
      {
         name: "Add Timelines",
         icon: History,
      },
      {
         name: "Messages",
         icon: MessageSquare,
      },
   ];

   const selectedOption = options.find((option) => option.name === active);

   useEffect(() => {
      window.scrollTo(0, 0);
   }, [active, selectedOption]);

   return (
      <div className='flex min-h-screen w-full flex-col bg-muted/40'>
         <aside className='fixed inset-y-0 left-0 hidden w-14 flex-col border-r bg-background sm:flex z-50'>
            <nav className='flex flex-col items-center gap-4 px-2 sm:py-5'>
               <Link className='group flex h-p w-p shrink-0 items-center justify-center gap-2 rounded-full'>
                  <Package
                     onClick={() => setActive(options?.[0]?.name)}
                     className='size-[22px] transition-all group-hover:scale-110'
                  />
                  <span className='sr-only'>Dashboard</span>{" "}
                  {/* the class sr-only means for screen reader only */}
               </Link>
               {options.map((option) => (
                  <CustomTooltipProvider
                     key={option.name}
                     value={option.name}
                     icon={option.icon}
                     active={active}
                     onClick={() => setActive(option.name)}
                  />
               ))}
            </nav>
            <nav className='mt-auto flex-col items-center gap-4 px-2 py-4'>
               <CustomTooltipProvider
                  value={"Logout"}
                  icon={LogOut}
                  active={active}
                  onClick={handleLogout}
               />
            </nav>
         </aside>
         <header className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 max-[900px]:h-[100px]'>
            <Sheet>
               <SheetTrigger asChild>
                  <Button size='icon' variant='outline' className='sm:hidden'>
                     <PanelLeft className='h-5 w-5' />
                     <span className='sr-only'>Toggle Menu</span>
                  </Button>
               </SheetTrigger>
               <SheetContent side='left' className='sm:max-w-xs'>
                  <nav className='grid gap-6 text-lg font-medium'>
                     <Link
                        className='group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'
                        to='/dashboard'
                     >
                        <Package2 className='h-5 w-5 transition-all group-hover:scale-110' />
                     </Link>
                     {linkOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                           <Link
                              key={option.name}
                              href='#'
                              className={`flex items-center gap-4 px-2.5 ${
                                 active === option.name
                                    ? "text-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                              }`}
                              onClick={() => setActive(option.name)}
                           >
                              <Icon className='h-5 w-5' />
                              {option.name}
                           </Link>
                        );
                     })}
                     <Link
                        className={`flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground`}
                        onClick={handleLogout}
                     >
                        <LogOut className='h-5 w-5' />
                     </Link>
                  </nav>
               </SheetContent>
            </Sheet>
            <div className='flex items-center gap-4 md:grow-0 sm:ml-16 sm:mt-5'>
               <img
                  src={user?.avatar?.url}
                  alt='avatar'
                  className='w-20 h-20 rounded-full max-[900px]:hidden'
               />
               <h1 className='text-4xl max-[900px]:text-2xl'>
                  Welcome back {user.fullName}
               </h1>
            </div>
         </header>
         {selectedOption && selectedOption.component}
      </div>
   );
};

export default HomePage;
