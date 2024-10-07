import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import {
   clearAllSkillSliceErrors,
   deleteSkill,
   getAllSkills,
   resetSkillSlice,
   updateSkill,
} from "@/store/slices/skillSlice";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import SkillSlot from "./sub-components/SkillSlot";

const ManageSkills = () => {
   const { loading, skills, error, message } = useSelector(
      (state) => state.skill
   );
   const dispatch = useDispatch();

   const [newProficiency, setNewProficiency] = useState(1);

   const handleInputChange = (proficiency) => {
      setNewProficiency(proficiency);
   };

   const handleUpdateSkill = (id, proficiency) => {
      dispatch(updateSkill(id, proficiency));
   };

   const handleDeleteSkill = (id) => {
      dispatch(deleteSkill(id));
   };

   useEffect(() => {
      if (error) {
         toast.error(error);
         dispatch(clearAllSkillSliceErrors());
      }
      if (message) {
         toast.success(message);
         dispatch(resetSkillSlice());
         dispatch(getAllSkills());
      }
   }, [dispatch, error, message, loading]);

   return (
      <div className='flex min-h-screen w-full flex-col bg-muted/40'>
         <Tabs>
            <TabsContent>
               <Card>
                  <CardHeader className='flex gap-4 sm:justify-between sm:flex-row sm:items-center'>
                     <CardTitle>Manage Your Skills</CardTitle>
                     <Link to={"/"}>
                        <Button className='w-fit'>Return to Dashboard</Button>
                     </Link>
                  </CardHeader>
                  <CardContent className='grid sm:grid-cols-2 gap-4'>
                     {skills && skills.length > 0 ? (
                        skills.map((skill) => (
                           <SkillSlot
                              key={skill._id}
                              skill={skill}
                              handleUpdate={handleUpdateSkill}
                              handleDelete={handleDeleteSkill}
                           />
                        ))
                     ) : (
                        <CardTitle className='text-3xl overflow-y-hidden'>
                           You Have Not Added Any Skill
                        </CardTitle>
                     )}
                  </CardContent>
               </Card>
            </TabsContent>
         </Tabs>
      </div>
   );
};

export default ManageSkills;
