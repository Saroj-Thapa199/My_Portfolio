import axios from "axios";
import { useEffect, useState } from "react";

const About = () => {
   const [user, setUser] = useState({});

   useEffect(() => {
      const getMyProfile = async () => {
         const { data } = await axios.get(
            "https://my-portfolio-backend-79fy.onrender.com/api/v1/user/portfolio/me",
            { withCredentials: true }
         );
         setUser(data.user);
      };
      getMyProfile();
   }, []);

   return (
      <div className='w-full flex flex-col overflow-hidden'>
         <div className='relative'>
            <h1
               className='flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold'
               style={{ background: "hsl(222.2 84% 4.9%)" }}
            >
               ABOUT
               <span className='text-tubeLight-effect font-extrabold'>ME</span>
            </h1>
            <span className='absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200'></span>
         </div>
         <div>
            <div className='grid md:grid-cols-2 my-8 sm:my-20 gap-14'>
               <div className='flex justify-center items-center'>
                  <img
                     src={user?.avatar?.url}
                     alt={user.fullName}
                     className='bg-white p-2 sm:p-4 rotate-[25deg] h-[240px] sm:h-[340px] md:h-[350px] lg:h-[450px]'
                  />
               </div>
               <div className='flex justify-center flex-col tracking-[1px] text-xl gap-5'>
                  <p>
                     Hi! I'm {user.fullName}, a full-stack developer specializing in the
                     MERN stack. I love bringing ideas to life by building
                     dynamic and user-friendly web applications.
                  </p>

                  <p>
                     Currently, I'm focused on learning Next.js and enhancing my
                     skills in creating scalable and elegant solutions. I often
                     use Tailwind CSS for efficient styling and theming.
                  </p>

                  <p>
                     Beyond coding, I enjoy working on side projects, exploring
                     game development, and experimenting with C++ to stay sharp
                     and solve real-world problems.
                  </p>
               </div>
            </div>
            <p className="tracking-[1px] text-xl">
            I'm always eager to learn, solve problems, and create meaningful digital experiences. Let's build something amazing together!
            </p>
         </div>
      </div>
   );
};

export default About;
