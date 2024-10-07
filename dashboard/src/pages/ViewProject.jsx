import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
   CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ViewProject = () => {
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
   const [gitRepoLink, setGitRepoLink] = useState("");
   const [projectLink, setProjectLink] = useState("");
   const [technologies, setTechnologies] = useState("");
   const [stack, setStack] = useState("");
   const [deployed, setDeployed] = useState("");
   const [projectBanner, setProjectBanner] = useState("");

   const { id } = useParams();

   useEffect(() => {
      const getProject = async () => {
         try {
            const res = await axios.get(
               `http://localhost:4000/api/v1/project/get/${id}`,
               {
                  withCredentials: true,
               }
            );
            setTitle(res.data.project.title);
            setDescription(res.data.project.description);
            setGitRepoLink(res.data.project.gitRepoLink);
            setProjectLink(res.data.project.projectLink);
            setTechnologies(res.data.project.technologies);
            setStack(res.data.project.stack);
            setDeployed(res.data.project.deployed);
            setProjectBanner(res.data.project?.projectBanner?.url);
         } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
         }
      };
      getProject();
   }, [id]);

   const descriptionInListFormat = description.split(". ");
   const technologiesInListFormat = technologies.split(", ");

   return (
      <div className='flex justify-center items-center min-h-screen sm:gap-4 sm:py-4 sm:pl-14 bg-gray-50'>
         <div className='w-full px-5 md:w-[1000px]'>
            <Card className='shadow-lg rounded-lg bg-white'>
               <CardHeader>
                  <CardTitle className='text-3xl font-bold mb-4'>
                     {title}
                  </CardTitle>
                  {projectBanner && (
                     <img
                        src={projectBanner}
                        alt={title}
                        className='w-full h-auto rounded-lg'
                     />
                  )}
               </CardHeader>
               <CardContent className='space-y-8'>
                  <div>
                     <CardDescription className='text-2xl font-semibold mb-2'>
                        Description
                     </CardDescription>
                     <ul className='list-disc list-inside space-y-2 text-gray-700'>
                        {descriptionInListFormat.map((item, index) => (
                           <li key={index}>{item}</li>
                        ))}
                     </ul>
                  </div>

                  <div>
                     <CardDescription className='text-2xl font-semibold mb-2'>
                        Technologies
                     </CardDescription>
                     <div className='flex flex-wrap gap-2'>
                        {technologiesInListFormat.map((item, index) => (
                           <Badge key={index} variant='outline'>
                              {item}
                           </Badge>
                        ))}
                     </div>
                  </div>

                  <div>
                     <CardDescription className='text-2xl font-semibold mb-2'>
                        Stack
                     </CardDescription>
                     <p className='text-gray-700'>{stack}</p>
                  </div>

                  <div>
                     <CardDescription className='text-2xl font-semibold mb-2'>
                        Deployed
                     </CardDescription>
                     <p className='text-gray-700'>{deployed}</p>
                  </div>

                  <div>
                     <CardDescription className='text-2xl font-semibold mb-2'>
                        Github Repository Link
                     </CardDescription>
                     {
                        gitRepoLink ? (
                           <Link
                        to={gitRepoLink}
                        target='_blank'
                        className='text-blue-600 hover:underline'
                     >
                        {gitRepoLink}
                     </Link>
                        ) : (
                           <span className="italic text-slate-500">Github Repository Link Not Available</span>
                        )
                     }
                  </div>

                  <div>
                     <CardDescription className='text-2xl font-semibold mb-2'>
                        Project Link
                     </CardDescription>
                     {
                        projectLink ? (
                           <Link
                        to={projectLink ? projectLink : "/"}
                        target='_blank'
                        className='text-sky-600 hover:underline'
                     >
                        {projectLink ? projectLink : "Still Not Deployed"}
                     </Link>
                        ) : (
                           <span className="italic text-slate-500">Project Link Not Available</span>
                        )
                     }
                  </div>

                  <div className='flex justify-end'>
                     <Button asChild>
                        <Link to='/'>Back to Projects</Link>
                     </Button>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   );
};

export default ViewProject;
