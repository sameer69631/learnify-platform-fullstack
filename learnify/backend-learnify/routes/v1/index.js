const authRoutes = require('./auth.route');
const homeRoute = require('./home.route');
const mentorRoute = require('./mentor.route')
const userRoute = require('./user.routes')
const serviceRoute = require('./service.route')
const bookingRoute = require('./booking.route')

const express = require('express')
const router = express.Router();

const Routes = [
    {
        path : "/",
        route : homeRoute
    },
    {
        path : "/auth",
        route : authRoutes
    },
    {
        path : "/mentor",
        route : mentorRoute
    },
    {
        path : "/user",
        route : userRoute
    },
    {
        path : "/service",
        route : serviceRoute
    },
    {
        path : "/bookings",
        route : bookingRoute
    }
]

Routes.forEach((routes) => {
    router.use(routes.path, routes.route)
});

module.exports = router;