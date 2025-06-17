import React, { use, useEffect } from 'react';
import BannerImg from '../assets/ferrari_sportscar_red_145464_benner.png'
import { Link, useLocation, useNavigate } from 'react-router';
import GoogleLoginBtn from '../components/GooglePoup/GoogleLoginBtn';
import ButtonII from '../components/ui/ButtonII';
import MainLogo from '../assets/logo.png'
import { AuthContext } from '../Provider/AuthContext';
import Swal from 'sweetalert2';

const SignUp = () => {
    useEffect(() => {
        document.title = 'Sign-Up Page';
    }, []);

    const { createUser, setUser, updateUser } = use(AuthContext)

    const navigate = useNavigate()
    const location = useLocation()

    const handleSignUp = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;

        createUser(email, password)
            .then(result => {
                const user = result.user;

                updateUser({ displayName: name, photoURL: photo })
                    .then(() => {
                        setUser({ ...user, displayName: name, photoURL: photo });

                        Swal.fire({
                            toast: true,
                            position: 'top-end',
                            icon: 'success',
                            title: 'Registered successfully!',
                            showConfirmButton: false,
                            timer: 2000,
                            timerProgressBar: true,
                        });

                        navigate(location.state ? location.state : "/");
                    })
                    .catch((error) => {
                        console.log(error);
                        setUser(user);
                    });

            })
            .catch((error) => {
                const errorMessage = error.message;

                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: errorMessage,
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });
            });
    };

    return (
        <section className="">

            <div className='flex items-center' >

                {/*1. Banner image */}
                <div className='flex-1 md:min-h-[calc(100vh)] lg:min-h-[calc(100vh+106px)] bg-cover bg-center md:flex justify-center items-center hidden '
                    style={{
                        backgroundImage: `linear-gradient(0deg, rgb(16,16,16) -19.5%, rgba(16,16,16,0) 100%), url(${BannerImg})`
                    }}
                >
                </div>

                {/* 2. Login form */}
                <div className='md:flex-2 lg:flex-1 md:mt-4 lg:mt-8'>
                    {/* Navbar */}
                    <nav className='grid grid-cols-3 mt-4  md:mt-0'>
                        <div className="flex items-center space-x-2 ml-4 md:ml-12 ">
                            <Link to='/'>
                                {/* website logo */}
                                <img className='w-12 hover:scale-105 transition-all' src={MainLogo} alt="" />
                            </Link>

                            <Link to='/'>
                                {/* title */}
                                <h1 className="tex-xl lg:text-2xl font-bold hover:scale-105 transition-all cursor-pointer">
                                    <span className='text-primary'>Ride</span><span className='text-secondary'>Nest</span>
                                </h1>
                            </Link>

                        </div>

                        <div>

                        </div>

                        <div className='text-right mr-4 md:mr-12'>
                            <Link to="/">
                                <button className='btn text-xs lg:text-sm btn-primary rounded-xl hover:scale-105 transition-all '>
                                    Back to Home
                                </button>
                            </Link>
                        </div>
                    </nav>

                    {/* Login */}
                    <div className="card bg-base-100 
                    rounded-2xl mx-auto mt-18 mb-48 md:p-4 lg:p-6
                    w-[90%] md:w-[80%] lg:max-w-[508px] p-2 shrink-0 shadow-2xl"
                    >

                        <h1 className="text-2xl md:text-3xl font-bold text-red-600 text-center m-2">Sign Up Now!</h1>
                        <div className="card-body">
                            {/* onSubmit={handleLogin} */}
                            <form className="fieldset" onSubmit={handleSignUp}>
                                <label className="label text-lg font-medium">Name</label>
                                <input type="text" name='name' className="input focus:outline-0 w-full" placeholder="Name" required />

                                <label className="label text-lg font-medium">Image</label>
                                <input type="text" name='photo' className="input focus:outline-0 w-full" placeholder="Photo URL" required />

                                <label className="label text-lg font-medium">Email</label>
                                <input name='email' type="email" className="input focus:outline-0 w-full" placeholder="Email" required />

                                <label className="label text-lg font-medium mt-2">Password</label>
                                <input
                                    name='password'
                                    type="current-password"
                                    className="input focus:outline-0 w-full "
                                    placeholder="Password"
                                    minLength="6"
                                    required />

                                {/* {errorMassage && <p className='text-red-500 font-semibold'>{errorMassage}</p>} */}

                                <ButtonII label="Sign Up" ClsName='text-lg mt-4' />

                            </form>
                            <p> If you have an account all ready? <Link className='text-red-700 font-semibold' to='/auth/login'>Login</Link></p>

                            {/* Sign in with Google onClick={handleGoogleLogin}*/}
                            <p className='font-medium text-gray-600 text-center text-base mt-4'>- Or -</p>
                            <GoogleLoginBtn />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignUp;