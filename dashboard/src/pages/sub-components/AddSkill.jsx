import {
   addNewSkill,
   clearAllSkillSliceErrors,
   getAllSkills,
   resetSkillSlice,
} from "@/store/slices/skillSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SpecialLoadingButton from "./SpecialLoadingButton";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Image } from "lucide-react";

const AddSkill = () => {
   const [title, setTitle] = useState("");
   const [proficiency, setProficiency] = useState("");
   const [svg, setSvg] = useState("");
   const [svgPreview, setSvgPreview] = useState("");

   const { loading, error, message } = useSelector((state) => state.skill);
   const dispatch = useDispatch();

   const handleSvg = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
         setSvg(file);
         setSvgPreview(reader.result);
      };
   };

   const handleAddNewSkill = (e) => {
    e.preventDefault()
      const formData = new FormData();
      formData.append("title", title);
      formData.append("proficiency", proficiency);
      formData.append("svg", svg);
      dispatch(addNewSkill(formData));
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
   }, [dispatch, loading, error, message]);

   return (
      <div className='flex justify-center items-center min-h-screen sm:gap-4 sm:py-4 sm:pl-14'>
         <form
            className='w-full px-5 md:w-[650px]'
            onSubmit={handleAddNewSkill}
         >
            <div className='space-y-12'>
               <div className='border-b border-gray-900/10 pb-12'>
                  <h2 className='font-semibold leading-7 text-gray-900 text-3xl text-center'>
                     ADD A NEW SKILL
                  </h2>
                  <div className='mt-10 flex flex-col gap-5'>
                     <div className='w-full sm:col-span-4'>
                        <Label className='block text-sm font-medium leading-6 text-gray-900'>
                           Title
                        </Label>
                        <div className='mt-2'>
                           <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                              <input
                                 type='text'
                                 placeholder='Title'
                                 value={title}
                                 onChange={(e) => setTitle(e.target.value)}
                                 className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 outline-0 sm:text-sm sm:leading-6'
                              />
                           </div>
                        </div>
                     </div>
                     <div className='w-full sm:col-span-4'>
                        <Label className='block text-sm font-medium leading-6 text-gray-900'>
                           Proficiency
                        </Label>
                        <div className='mt-2'>
                           <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                              <input
                                 type='number'
                                 placeholder='30'
                                 value={proficiency}
                                 onChange={(e) =>
                                    setProficiency(e.target.value)
                                 }
                                 className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 outline-0 sm:text-sm sm:leading-6'
                              />
                           </div>
                        </div>
                     </div>

                     <div className='col-span-full'>
                        <label className='block text-sm font-medium leading-6 text-gray-900'>
                           Skill svg
                        </label>
                        <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
                           <div className='text-center'>
                              {svgPreview ? (
                                 <img
                                    src={svgPreview}
                                    alt='skill_svg'
                                    className='mx-auto h-12 w-12 text-gray-300'
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
                     Add Skill
                  </Button>
               )}
            </div>
         </form>
      </div>
   );
};

export default AddSkill;
