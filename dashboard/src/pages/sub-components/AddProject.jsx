import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Image, X } from "lucide-react";
import {
   addNewProject,
   clearAllProjectSliceErrors,
   getAllProjects,
   resetProjectSlice,
} from "@/store/slices/projectSlice";
import { Textarea } from "@/components/ui/textarea";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";

const AddProject = () => {
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
   const [gitRepoLink, setGitRepoLink] = useState("");
   const [projectLink, setProjectLink] = useState("");
   const [technologies, setTechnologies] = useState([]);
   const [techInput, setTechInput] = useState("");
   const [stack, setStack] = useState("");
   const [deployed, setDeployed] = useState("");
   const [projectBanner, setProjectBanner] = useState("");
   const [projectBannerPreview, setProjectBannerPreview] = useState("");

   const { loading, error, message } = useSelector((state) => state.project);
   const dispatch = useDispatch();

   const handleEnterKeyDown = (e) => {
      if (e.key !== "Enter") return;
      e.preventDefault();
      if (!techInput || technologies.includes(techInput)) return;
      setTechnologies((prevTechs) => [...prevTechs, techInput]);
      setTechInput("");
   };

   const removeTech = (indexToRemove) => {
      setTechnologies((prevTechs) =>
         prevTechs.filter((_, index) => index !== indexToRemove)
      );
   };

   const handleSvg = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
         setProjectBanner(file);
         setProjectBannerPreview(reader.result);
      };
   };

   const handleAddNewProject = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("gitRepoLink", gitRepoLink);
      formData.append("projectLink", projectLink);
      formData.append("technologies", technologies.join(", "));
      formData.append("stack", stack);
      formData.append("deployed", deployed);
      formData.append("projectBanner", projectBanner);
      dispatch(addNewProject(formData));
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
   }, [dispatch, loading, error, message]);

   return (
      <div className='flex justify-center items-center min-h-screen sm:gap-4 sm:py-4 sm:pl-14'>
         <form
            className='w-full px-5 md:w-[1000px]'
            onSubmit={handleAddNewProject}
         >
            <div className='space-y-12'>
               <div className='border-b border-gray-900/10 pb-12'>
                  <h2 className='font-semibold leading-7 text-gray-900 text-3xl text-center'>
                     ADD A NEW PROJECT
                  </h2>
                  <div className='mt-10 flex flex-col gap-5'>
                     <div className='w-full sm:col-span-4'>
                        <Label className='block text-sm font-medium leading-6 text-gray-900'>
                           Title *
                        </Label>
                        <div className='mt-2'>
                           <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                              <input
                                 type='text'
                                 placeholder='Project Title'
                                 value={title}
                                 onChange={(e) => setTitle(e.target.value)}
                                 className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 outline-0 sm:text-sm sm:leading-6'
                              />
                           </div>
                        </div>
                     </div>
                     <div className='w-full sm:col-span-4'>
                        <Label className='block text-sm font-medium leading-6 text-gray-900'>
                           Description *
                        </Label>
                        <div className='mt-2'>
                           <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                              <Textarea
                                 placeholder='Feature 1. Feature 2. Feature 3.'
                                 value={description}
                                 onChange={(e) =>
                                    setDescription(e.target.value)
                                 }
                                 className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 outline-0 sm:text-sm sm:leading-6'
                              />
                           </div>
                        </div>
                     </div>

                     <div className='w-full sm:col-span-4'>
                        <Label className='block text-sm font-medium leading-6 text-gray-900'>
                           Technologies Used In This Project *
                        </Label>
                        <div className='mt-2'>
                           <div
                              className={`flex flex-wrap items-center gap-1 px-3 py-1 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 ${
                                 technologies.length > 0 ? "px-3" : "px-0"
                              }`}
                           >
                              {technologies.length > 0 &&
                                 technologies.map((tech, index) => (
                                    <div
                                       key={index}
                                       className='flex items-center px-2 bg-blue-300 rounded-md'
                                    >
                                       <span className='italic'>{tech}</span>
                                       <button
                                          type="button"
                                          onClick={() => removeTech(index)}
                                       >
                                          <X strokeWidth={1} />
                                       </button>
                                    </div>
                                 ))}
                              <input
                                 type='text'
                                 placeholder='HTML, CSS, Javascript'
                                 value={techInput}
                                 onChange={(e) => setTechInput(e.target.value)}
                                 className={`block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 outline-0 sm:text-sm sm:leading-6 ${
                                    technologies.length > 0 && "ml-[-8px]"
                                 } ${
                                    technologies.includes(techInput) &&
                                    "text-red-700 italic"
                                 }`}
                                 onKeyDown={handleEnterKeyDown}
                              />
                           </div>
                        </div>
                     </div>

                     <div className='w-full sm:col-span-4'>
                        <Label className='block text-sm font-medium leading-6 text-gray-900'>
                           Stack *
                        </Label>
                        <div className='mt-2'>
                           <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                              <Select
                                 value={stack}
                                 onValueChange={(selectedValue) =>
                                    setStack(selectedValue)
                                 }
                              >
                                 <SelectTrigger>
                                    <SelectValue
                                       placeholder={
                                          stack || "Select Project Stack"
                                       }
                                    />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value='Full Stack'>
                                       Full Stack
                                    </SelectItem>
                                    <SelectItem value='MERN'>MERN</SelectItem>
                                    <SelectItem value='MEAN'>MEAN</SelectItem>
                                    <SelectItem value='MEVS'>MEVS</SelectItem>
                                    <SelectItem value='NEXT.JS'>
                                       NEXT.JS
                                    </SelectItem>
                                    <SelectItem value='REACT.JS'>
                                       REACT.JS
                                    </SelectItem>
                                 </SelectContent>
                              </Select>
                           </div>
                        </div>
                     </div>

                     <div className='w-full sm:col-span-4'>
                        <Label className='block text-sm font-medium leading-6 text-gray-900'>
                           Deployment *
                        </Label>
                        <div className='mt-2'>
                           <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                              <Select
                                 value={deployed}
                                 onValueChange={(selectedValue) =>
                                    setDeployed(selectedValue)
                                 }
                              >
                                 <SelectTrigger>
                                    <SelectValue
                                       placeholder={
                                          deployed || "Deployed Status"
                                       }
                                    />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value='Yes'>Yes</SelectItem>
                                    <SelectItem value='No'>No</SelectItem>
                                 </SelectContent>
                              </Select>
                           </div>
                        </div>
                     </div>

                     <div className='w-full sm:col-span-4'>
                        <Label className='block text-sm font-medium leading-6 text-gray-900'>
                           Github Repository Link{" "}
                           <span className='text-xs font-[475] text-gray-400'>
                              (Github Repo Link or Project Link Required)
                           </span>
                        </Label>
                        <div className='mt-2'>
                           <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                              <input
                                 type='text'
                                 placeholder='Enter Your Github Repository Link To The Project'
                                 value={gitRepoLink}
                                 onChange={(e) =>
                                    setGitRepoLink(e.target.value)
                                 }
                                 className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 outline-0 sm:text-sm sm:leading-6'
                              />
                           </div>
                        </div>
                     </div>
                     <div className='w-full sm:col-span-4'>
                        <Label className='block text-sm font-medium leading-6 text-gray-900'>
                           Project Link{" "}
                           <span className='text-xs font-[475] text-gray-400'>
                              (Github Repo Link or Project Link Required)
                           </span>
                        </Label>
                        <div className='mt-2'>
                           <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                              <input
                                 type='text'
                                 placeholder='Enter Your Project Link'
                                 value={projectLink}
                                 onChange={(e) =>
                                    setProjectLink(e.target.value)
                                 }
                                 className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 outline-0 sm:text-sm sm:leading-6'
                              />
                           </div>
                        </div>
                     </div>

                     <div className='col-span-full'>
                        <label className='block text-sm font-medium leading-6 text-gray-900'>
                           Project Banner *
                        </label>
                        <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
                           <div className='text-center'>
                              {projectBannerPreview ? (
                                 <img
                                    src={projectBannerPreview}
                                    alt='project_banner'
                                    className='mx-auto h-[250px] w-full text-gray-300'
                                 />
                              ) : (
                                 <Image
                                    aria-hidden='true'
                                    className='mx-auto h-12 w-12 text-gray-300'
                                 />
                              )}
                              <div className='mt-4 flex text-sm leading-6 text-gray-600'>
                                 <label className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'>
                                    <span>Upload a file</span>
                                    <input
                                       type='file'
                                       className='sr-only'
                                       onChange={handleSvg}
                                    />
                                 </label>
                                 <p className='pl-1'>or drag and drop</p>
                              </div>
                              <p className='text-xs leading-5 text-gray-600'>
                                 PNG, JPG, GIF up to 10MB
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               {loading ? (
                  <SpecialLoadingButton content={"Adding"} />
               ) : (
                  <Button type='submit' className='w-full'>
                     Add Project
                  </Button>
               )}
            </div>
         </form>
      </div>
   );
};

export default AddProject;
