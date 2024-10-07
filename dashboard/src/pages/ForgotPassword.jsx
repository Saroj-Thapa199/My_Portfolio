import {
   clearAllForgotPasswordErrors,
   forgotPassword,
} from "@/store/slices/forgotResetPassword";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";

const ForgotPassword = () => {
   const dispatch = useDispatch();
   const { loading, error, message } = useSelector(
      (state) => state.forgotPassword
   );
   const { isAuthenticated } = useSelector((state) => state.user);
   const navigate = useNavigate();
   const [email, setEmail] = useState("");

   const handleForgotPassword = () => {
      dispatch(forgotPassword(email));
   };

   useEffect(() => {
      if (error) {
         toast.error(error);
         dispatch(clearAllForgotPasswordErrors());
      }
      if (isAuthenticated) {
         navigate("/");
      }
      if (message !== null) {
         toast.success(message);
      }
   }, [dispatch, isAuthenticated, error, loading]);

   return (
      <>
         <div className='w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]'>
            <div className='min-h-[100vh] flex items-center justify-center py-12'>
               <div className='mx-auto grid w-[350px] gap-6'>
                  <div className='grid gap-2 text-center'>
                     <h1 className='text-3xl font-bold'>Forgot Password</h1>
                     <p className='text-balance text-muted-foreground'>
                        Enter your email to request a reset password link
                     </p>
                  </div>
                  <div className='grid gap-4'>
                     <div className='grid gap-2'>
                        <Label htmlFor='email'>Email</Label>
                        <Input
                           id='email'
                           type='email'
                           placeholder='m@example.com'
                           required
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                        />
                     </div>
                     <div className='grid gap-2'>
                        <div className='flex items-center'>
                           <Link
                              to={-1}
                              className='ml-auto inline-block text-sm underline'
                           >
                              Go back
                           </Link>
                        </div>
                     </div>
                     {loading ? (
                        <SpecialLoadingButton content={"Requesting"} />
                     ) : (
                        <Button
                           type='submit'
                           className='w-full'
                           onClick={handleForgotPassword}
                        >
                           Continue
                        </Button>
                     )}
                  </div>
               </div>
            </div>
            <div className='hidden bg-muted lg:block'>
               <img
                  src='/placeholder.svg'
                  alt='Image'
                  width='1920'
                  height='1080'
                  className='h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
               />
            </div>
         </div>
      </>
   );
};

export default ForgotPassword;
