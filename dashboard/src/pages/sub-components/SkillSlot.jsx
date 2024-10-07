import { Button } from "@/components/ui/button";
import { CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
   Tooltip,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";

const SkillSlot = ({ skill, handleUpdate, handleDelete }) => {
   const [proficiency, setProficiency] = useState(skill.proficiency);

   return (
      <CardHeader className='shadow-md border-gray-300 border rounded-2xl '>
         <CardHeader className='text-3xl font-bold items-center justify-between flex-row'>
            {skill.title}
            <TooltipProvider>
               <Tooltip>
                  <div className='flex items-center gap-2 sm:gap-4'>
                     <Button
                        onClick={() => handleUpdate(skill._id, proficiency)}
                     >
                        Update
                     </Button>
                     <TooltipTrigger asChild>
                        <Trash2
                           onClick={() => handleDelete(skill._id)}
                           className='h-5 w-5 hover:text-red-600 cursor-pointer'
                        />
                     </TooltipTrigger>
                  </div>
                  <TooltipContent side='right' className='dark:text-red-600'>
                     Delete
                  </TooltipContent>
               </Tooltip>
            </TooltipProvider>
         </CardHeader>
         <CardFooter>
            <Label className='text-2xl mr-2'>Proficiency</Label>
            <Input
               type='number'
               value={proficiency}
               className='border-gray-400 border'      
               onChange={(e) => setProficiency(e.target.value)}
         
            />
         </CardFooter>
      </CardHeader>
   );
};

export default SkillSlot;
