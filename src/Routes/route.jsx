import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Loading from "../components/ui/Loading";
import AvailableCars from "../pages/AvailableCars";
import AddCar from "../pages/AddCar";
import MyCars from "../pages/MyCars";
import MyBookings from "../pages/MyBookings";
import ErrorPage from "../pages/ErrorPage";
import CarDetails from "../pages/CarDetails";
import Login from "../pages/Login";
import AuthLayout from "../layouts/AuthLayout";
import SignUp from "../pages/SignUp";
import PrivateRoute from "../Provider/PrivateRoute";


const Router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                Component: Home,
                loader: () => fetch('https://ride-next-server.vercel.app/all-vehicles'),
                HydrateFallback: Loading,
            },
            {
                path: '/available-cars',
                Component: AvailableCars,
            },
            {
                path: '/car-details/:id',
                loader: ({ params }) => fetch(`https://ride-next-server.vercel.app/vehicle/${params.id}`),
                HydrateFallback: Loading,
                element: <PrivateRoute><CarDetails/></PrivateRoute>

            },
            {
                path: '/add-car',
                element: <PrivateRoute><AddCar/></PrivateRoute>

            },
            {
                path: '/my-cars',
                element: <PrivateRoute><MyCars/></PrivateRoute>

            },
            {
                path: '/my-bookings',
                element: <PrivateRoute><MyBookings/></PrivateRoute>

            },

        ]
    },
    {
        path: '/auth',
        Component: AuthLayout,
        HydrateFallback: Loading,
        children: [
            {
                path: '/auth/login',
                Component: Login,
            },
            {
                path: '/auth/sign-up',
                Component: SignUp,
            },
        ]
    },
])

export default Router