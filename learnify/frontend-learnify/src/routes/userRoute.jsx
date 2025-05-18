import Home from "../pages";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Profile from "../pages/dashboard/Profile";
import Services from "../pages/dashboard/Services";
import Bookings from "../pages/dashboard/Bookings";
import StudentBookings from "../pages/dashboard/StudentBookings";
import AllMentors from "../pages/AllMentors";
import MentorSessions from "../pages/MentorSessions";

const routes = [
    {path:"/", element:<Home/>, isProtected:false},
    {path:"/signin", element:<SignIn/>, isProtected:false},
    {path:"/signup/:role", element:<SignUp/>, isProtected:false},
    {path:"/dashboard/profile", element:<Profile/>, isProtected:true},
    {path:"/dashboard/services", element:<Services/>, isProtected:true},
    {path:"/dashboard/bookings", element:<Bookings/>, isProtected:true},
    {path:"/dashboard/studentBookings", element:<StudentBookings/>, isProtected:true},
    {path:"/all-mentors", element:<AllMentors/>, isProtected:true},
    {path:"/MentorSessions", element:<MentorSessions/>, isProtected:true},
]

export default routes