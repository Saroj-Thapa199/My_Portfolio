import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SpecialLoadingButton from "./SpecialLoadingButton";
import {
   clearAllUserErrors,
   getUser,
   resetProfile,
   updateProfile,
} from "@/store/slices/userSlice";
import { toast } from "react-toastify";

const UpdateProfile = () => {
   const { user, loading, error, isUpdated, message } = useSelector(
      (state) => state.user
   );
   const dispatch = useDispatch();

   const [fullName, setFullName] = useState(user?.fullName);
   const [email, setEmail] = useState(user?.email);
   const [phone, setPhone] = useState(user?.phone);
   const [aboutMe, setAboutMe] = useState(user?.aboutMe);
   const [portfolioURL, setPortfolioURL] = useState(user?.portfolioURL);
   const [linkedInURL, setLinkedInURL] = useState(user?.linkedInURL);
   const [githubURL, setGithubURL] = useState(user?.githubURL || "");
   const [instagramURL, setInstagramURL] = useState(user?.instagramURL || "");
   const [twitterURL, setTwitterURL] = useState(user?.twitterURL || "");
   const [facebookURL, setFacebookURL] = useState(user?.facebookURL || "");
   const [avatar, setAvatar] = useState();
   const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url);
   const [resume, setResume] = useState();
   const [resumePreview, setResumePreview] = useState(user?.resume?.url);

   const avatarHandler = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
         setAvatarPreview(reader.result);
         setAvatar(file);
      };
   };

   const resumeHandler = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
         setResumePreview(reader.result);
         setResume(file);
      };
   };

   const handleUpdateProfile = () => {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("aboutMe", aboutMe);
      formData.append("portfolioURL", portfolioURL);
      formData.append("linkedInURL", linkedInURL);
      formData.append("githubURL", githubURL);
      formData.append("instagramURL", instagramURL);
      formData.append("twitterURL", twitterURL);
      formData.append("facebookURL", facebookURL);
      formData.append("avatar", avatar);
      formData.append("resume", resume);
      dispatch(updateProfile(formData));
   };

   useEffect(() => {
      if (error) {
         toast.error(error);
         dispatch(clearAllUserErrors());
      }
      if (isUpdated) {
         dispatch(getUser());
         dispatch(resetProfile());
      }
      if (message) {
         toast.success(message);
      }
   }, [dispatch, loading, error, isUpdated]);

   return (
      <div className='w-full h-full'>
         <div>
            <div className='grid w-[100%] gap-6'>
               <div className='grid gap-2'>
                  <h1 className='text-3xl font-bold'>Update Profile</h1>
                  <p className='mb-5'>Update Your Profile</p>
               </div>
            </div>
            <div className='grid gap-6'>
               <div className='flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5'>
                  <div className='grid gap-2 w-full sm:w-72'>
                     <Label>Profile Image</Label>
                     <img
                        src={avatarPreview ? avatarPreview : "./vite.svg"}
                        alt='avatar'
                        className='w-full h-auto sm:w-72 sm:h-72 rounded-2xl'
                     />
                     <input
                        type='file'
                        placeholder='Your Full Name'
                        accept='image/*'
                        className='avatar-update-btn'
                        onChange={avatarHandler}
                     />
                  </div>
                  <div className='grid gap-2 w-full sm:w-72'>
                     <Label>Resume</Label>
                     <Link to={user?.resume?.url} target='_blank'>
                        <img
                           src={resumePreview ? resumePreview : "./vite.svg"}
                           alt='resume'
                           className='w-full h-auto sm:w-72 sm:h-72 rounded-2xl'
                        />
                     </Link>
                     <input
                        type='file'
                        placeholder='Your Full Name'
                        accept='image/*'
                        className='avatar-update-btn'
                        onChange={resumeHandler}
                     />
                  </div>
               </div>
               <div className='grid gap-2'>
                  <Label>Full Name</Label>
                  <Input
                     type='text'
                     placeholder='Your Full Name'
                     value={fullName}
                     onChange={(e) => setFullName(e.target.value)}
                  />
               </div>
               <div className='grid gap-2'>
                  <Label>Email</Label>
                  <Input
                     type='text'
                     placeholder='Your Email'
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />
               </div>
               <div className='grid gap-2'>
                  <Label>Phone</Label>
                  <Input
                     type='text'
                     placeholder='Your Phone'
                     value={phone}
                     onChange={(e) => setPhone(e.target.value)}
                  />
               </div>
               <div className='grid gap-2'>
                  <Label>About Me</Label>
                  <Textarea
                     value={aboutMe}
                     onChange={(e) => setAboutMe(e.target.value)}
                  />
               </div>
               <div className='grid gap-2'>
                  <Label>Portfolio URL</Label>
                  <Input
                     type='text'
                     placeholder='Your Portfolio URL'
                     value={portfolioURL}
                     onChange={(e) => setPortfolioURL(e.target.value)}
                  />
               </div>
               <div className='grid gap-2'>
                  <Label>GitHub URL</Label>
                  <Input
                     type='text'
                     placeholder='Your GitHub URL'
                     value={githubURL}
                     onChange={(e) => setGithubURL(e.target.value)}
                  />
               </div>
               <div className='grid gap-2'>
                  <Label>LinkedIn URL</Label>
                  <Input
                     type='text'
                     placeholder='Your LinkedIn URL'
                     value={linkedInURL}
                     onChange={(e) => setLinkedInURL(e.target.value)}
                  />
               </div>
               <div className='grid gap-2'>
                  <Label>Instagram URL</Label>
                  <Input
                     type='text'
                     placeholder='Your Instagram URL'
                     value={instagramURL}
                     onChange={(e) => setInstagramURL(e.target.value)}
                  />
               </div>
               <div className='grid gap-2'>
                  <Label>Twitter(X) URL</Label>
                  <Input
                     type='text'
                     placeholder='Your Twitter URL'
                     value={twitterURL}
                     onChange={(e) => setTwitterURL(e.target.value)}
                  />
               </div>
               <div className='grid gap-2'>
                  <Label>Facebook URL</Label>
                  <Input
                     type='text'
                     placeholder='Your Facebook URL'
                     value={facebookURL}
                     onChange={(e) => setFacebookURL(e.target.value)}
                  />
               </div>
               <div className='grid gap-2'>
                  {loading ? (
                     <SpecialLoadingButton content={"Updating"} />
                  ) : (
                     <Button onClick={handleUpdateProfile} className='w-full'>
                        Update Profile
                     </Button>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default UpdateProfile;
