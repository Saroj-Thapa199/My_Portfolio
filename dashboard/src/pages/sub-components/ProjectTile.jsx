import { TableCell, TableRow } from "@/components/ui/table";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye, Loader2, Pen, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProjectTile = ({ project, handleDelete, loading }) => {
   const [deleteId, setDeleteId] = useState("");

   return (
      <TableRow className='bg-accent' key={project._id}>
         <TableCell>
            <div>
               <img
                  src={project.projectBanner.url}
                  alt={project.title}
                  className='w-16 h-16'
               />
            </div>
         </TableCell>
         <TableCell className='font-medium'>{project.title}</TableCell>
         <TableCell className='hidden md:table-cell'>{project.stack}</TableCell>
         <TableCell className='hidden md:table-cell'>
            {project.deployed}
         </TableCell>
         <TableCell className='flex flex-row items-center gap-3 h-24'>
            <TooltipProvider>
               <Tooltip>
                  <TooltipTrigger asChild>
                     <Link to={`/view/project/${project._id}`}>
                        <button className='border-green-400 border-2 rounded-full h-8 w-8 flex justify-center items-center text-green-400 hover:text-slate-950 hover:bg-green-400'>
                           <Eye className='h-5 w-5' />
                        </button>
                     </Link>
                  </TooltipTrigger>
                  <TooltipContent side='bottom'>View</TooltipContent>
               </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
               <Tooltip>
                  <TooltipTrigger asChild>
                     <Link to={`/update/project/${project._id}`}>
                        <button className='border-yellow-400 border-2 rounded-full h-8 w-8 flex justify-center items-center text-yellow-400 hover:text-slate-950 hover:bg-yellow-400'>
                           <Pen className='h-5 w-5' />
                        </button>
                     </Link>
                  </TooltipTrigger>
                  <TooltipContent side='bottom'>Update</TooltipContent>
               </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
               <Tooltip>
                  <TooltipTrigger asChild>
                     {loading && deleteId === project._id ? (
                        <button className='border-red-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-red-600'>
                           <Loader2 className='h-5 w-5 animate-spin' />
                        </button>
                     ) : (
                        <button
                           className='border-red-600 border-2 rounded-full h-8 w-8 flex justify-center items-center text-red-600 hover:text-slate-950 hover:bg-red-600'
                           onClick={() => {
                              setDeleteId(project._id);
                              handleDelete(project._id);
                           }}
                        >
                           <Trash2 className='h-5 w-5' />
                        </button>
                     )}
                  </TooltipTrigger>
                  <TooltipContent side='bottom'>Delete</TooltipContent>
               </Tooltip>
            </TooltipProvider>
         </TableCell>
      </TableRow>
   );
};

export default ProjectTile;
