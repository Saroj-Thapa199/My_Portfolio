import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import {
   clearAllProjectSliceErrors,
   deleteProject,
   getAllProjects,
   resetProjectSlice,
   updateProject,
} from "@/store/slices/projectSlice";
import { Eye, Pen, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ProjectTile from "./sub-components/ProjectTile";

const ManageProjects = () => {
   const { loading, error, message, projects } = useSelector(
      (state) => state.project
   );
   const dispatch = useDispatch();

   const handleUpdateProject = (id, proficiency) => {
      dispatch(updateProject(id, proficiency));
   };

   const handleDeleteProject = (id) => {
      dispatch(deleteProject(id));
   };

   useEffect(() => {
      if (error) {
         toast.error(error);
         dispatch(clearAllProjectSliceErrors());
      }
      if (message) {
         toast.success(message);
         dispatch(resetProjectSlice());
         dispatch(getAllProjects());
      }
   }, [dispatch, error, message, loading]);

   return (
      <div className='flex min-h-screen w-full flex-col bg-muted/40'>
         <Tabs>
            <TabsContent>
               <Card>
                  <CardHeader className='flex gap-4 justify-between sm:flex-row sm:items-center'>
                     <CardTitle>Manage Your Timeline</CardTitle>
                     <Link to={"/"}>
                        <Button>Return to Dashboard</Button>
                     </Link>
                  </CardHeader>
                  <CardContent className='grid gap-4'>
                     <Table>
                        <TableHeader>
                           <TableRow>
                              <TableHead>Banner</TableHead>
                              <TableHead>Title</TableHead>
                              <TableHead className='hidden md:table-cell'>Stack</TableHead>
                              <TableHead className='hidden md:table-cell'>Deployed Status</TableHead>
                              <TableHead className='max-sm:text-center'>Action</TableHead>
                           </TableRow>
                        </TableHeader>
                        <TableBody>
                           {projects && projects.length > 0 ? (
                              projects.map((project) => (
                                 <ProjectTile
                                    key={project._id}
                                    project={project}
                                    handleDelete={handleDeleteProject}
                                    loading={loading}
                                 />
                              ))
                           ) : (
                              <TableRow>
                                 <TableCell className='text-3xl overflow-y-hidden'>
                                    You Have Not Added Any Projects.
                                 </TableCell>
                              </TableRow>
                           )}
                        </TableBody>
                     </Table>
                  </CardContent>
               </Card>
            </TabsContent>
         </Tabs>
      </div>
   );
};

export default ManageProjects;
