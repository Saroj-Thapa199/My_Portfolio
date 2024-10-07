import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ManageSkills from "./pages/ManageSkills";
import ManageTimeline from "./pages/ManageTimeline";
import ManageProjects from "./pages/ManageProjects";
import ViewProject from "./pages/ViewProject";
import UpdateProject from "./pages/UpdateProject";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./store/slices/userSlice";
import { getAllMessages } from "./store/slices/messagesSlice";
import { getAllTimeline } from "./store/slices/timelineSlice";
import { getAllSkills } from "./store/slices/skillSlice";
import { getAllSoftwareApplications } from "./store/slices/softwareApplicationSlice";
import { getAllProjects } from "./store/slices/projectSlice";
import AuthProvider from "./pages/sub-components/AuthProvider";
import Test from "./pages/Test";
import ScrollToTop from "./pages/sub-components/ScrollToTop";

function App() {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getUser());
      dispatch(getAllMessages());
      dispatch(getAllTimeline());
      dispatch(getAllSkills());
      dispatch(getAllSoftwareApplications());
      dispatch(getAllProjects());
   }, []);

   return (
      <Router>
         <ScrollToTop />
         <Routes>
            <Route path='/login' element={<Login />} />
            <Route element={<AuthProvider />}>
               <Route path='/' element={<HomePage />} />
               <Route path='/password/forgot' element={<ForgotPassword />} />
               <Route
                  path='/password/reset/:token'
                  element={<ResetPassword />}
               />
               <Route path='/manage/skills' element={<ManageSkills />} />
               <Route path='/manage/timeline' element={<ManageTimeline />} />
               <Route path='/manage/projects' element={<ManageProjects />} />
               <Route path='/view/project/:id' element={<ViewProject />} />
               <Route path='/update/project/:id' element={<UpdateProject />} />
            </Route>
            <Route path="/test" element ={<Test />} />
         </Routes>
         <ToastContainer position='bottom-right' theme='dark' />
      </Router>
   );
}

export default App;
