import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import SpecialLoadingButton from "./sub-components/SpecialLoadingButton";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { clearAllForgotPasswordErrors, resetPassword } from "@/store/slices/forgotResetPassword";
import { toast } from "react-toastify";
import { getUser } from "@/store/slices/userSlice";

const ResetPassword = () => {
   const { token } = useParams();

   const dispatch = useDispatch();
   const { loading, error, message } = useSelector(
      (state) => state.forgotPassword
   );
   const { isAuthenticated } = useSelector((state) => state.user);

   const navigate = useNavigate();

   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");

   const handleResetPassword = () => {
      dispatch(resetPassword(token, password, confirmPassword));
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
         dispatch(getUser())
      }
   }, [dispatch, isAuthenticated, error, loading]);

   return (
      <div className='w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]'>
         <div className='min-h-[100vh] flex items-center justify-center py-12'>
            <div className='mx-auto grid w-[350px] gap-6'>
               <div className='grid gap-2 text-center'>
                  <h1 className='text-3xl font-bold'>Reset Password</h1>
                  <p className='text-balance text-muted-foreground'>
                     Enter your new password
                  </p>
               </div>
               <div className='grid gap-4'>
                  <div className='grid gap-2'>
                     <Label htmlFor='password'>Password</Label>
                     <Input
                        id='password'
                        type='password'
                        placeholder='********'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                     />
                  </div>
                  <div className='grid gap-2'>
                     <Label htmlFor='confirmPassword'>Confirm Password</Label>
                     <Input
                        id='confirmPassword'
                        type='password'
                        placeholder='********'
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                     />
                  </div>
                  {loading ? (
                     <SpecialLoadingButton content={"Resetting Password"} />
                  ) : (
                     <Button
                        type='submit'
                        className='w-full'
                        onClick={handleResetPassword}
                     >
                        Reset Password
                     </Button>
                  )}
               </div>
            </div>
         </div>
         <div className='hidden bg-muted lg:block'>
            <img
               src='/resetPass.avif'
               alt='Image'
               width='1920'
               height='1080'
               className='h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
            />
         </div>
      </div>
   );
};

export default ResetPassword;
