import { Card } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";

const MyApps = () => {
   const [apps, setApps] = useState([]);

   useEffect(() => {
      const getMyApps = async () => {
         const { data } = await axios.get(
            "https://my-portfolio-backend-79fy.onrender.com/api/v1/software-application/get-all",
            { withCredentials: true }
         );
         setApps(data.softwareApplications);
      };
      getMyApps();
   }, []);
   return (
      <div className='w-full flex flex-col gap-8 sm:gap-12'>
         <h1 className='text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] tracking-[15px] dancing_text mx-auto w-fit'>
            MY APPS
         </h1>
         <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
            {apps &&
               apps.map((app) => (
                  <Card
                     className='h-fit p-7 flex flex-col justify-center items-center gap-3'
                     key={app._id}
                  >
                     <img
                        src={app?.svg?.url}
                        alt={app.title}
                        className='h-12 sm:h-24 w-auto'
                     />
                     <p className="text-muted-foreground text-center">{app.name}</p>
                  </Card>
               ))}
         </div>
      </div>
   );
};

export default MyApps;
