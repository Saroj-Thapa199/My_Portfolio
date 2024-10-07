import { Card } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";

const Skills = () => {
   const [skills, setSkills] = useState([]);

   useEffect(() => {
      const getMySkills = async () => {
         const { data } = await axios.get(
            "http://localhost:4000/api/v1/skill/get-all",
            { withCredentials: true }
         );
         setSkills(data.skills);
      };
      getMySkills();
   }, []);
   return (
      <div className='w-full flex flex-col gap-8 sm:gap-12'>
         <h1 className='text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] tracking-[15px] dancing_text mx-auto w-fit'>
            SKILLS
         </h1>
         <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
            {skills &&
               skills.map((skill) => (
                  <Card
                     className='h-fit p-7 flex flex-col justify-center items-center gap-3'
                     key={skill._id}
                  >
                     <img
                        src={skill?.svg?.url}
                        alt={skill.title}
                        className='h-12 sm:h-24 w-auto`'
                     />
                     <p className="text-muted-foreground text-center">{skill.title}</p>
                  </Card>
               ))}
         </div>
      </div>
   );
};

export default Skills;
