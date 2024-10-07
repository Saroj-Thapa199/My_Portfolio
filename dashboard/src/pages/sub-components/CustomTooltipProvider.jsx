import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";
import { Link } from "react-router-dom";

const CustomTooltipProvider = ({ value, icon: Icon, active, onClick }) => {
   return (
      <TooltipProvider>
         <Tooltip>
            <TooltipTrigger asChild>
               <Link
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                     active === value
                        ? "text-accent-foreground bg-accent"
                        : "text-muted-foreground"
                  } transition-colors hover:text-muted-foreground md:h-8 md:w-8 hover:bg-accent`}
                  onClick={onClick}
               >
                  <Icon className='w-5 h-5' />
                  <span className='sr-only'>{value}</span>
               </Link>
            </TooltipTrigger>
            <TooltipContent side='right'>{value}</TooltipContent>
         </Tooltip>
      </TooltipProvider>
   );
};

export default CustomTooltipProvider;
