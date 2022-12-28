import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { createUser,  googleSignIn } = useContext(AuthContext);
    const [signUpError, setSignUpError] = useState('');
    const navigate = useNavigate();
    // handle google signIn
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                navigate('/')
            })
            .catch(error => {
                console.log(error);
                setSignUpError(error.message)
            })
    }


    // handle sign up
    const handleSignUp = (data) => {
        console.log(data);
        setSignUpError('')
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                toast.success('User Create Successfully')
                reset()
                navigate('/')

                // handle update user 
                // const userInfo = {
                //     displayName: data.name
                // };
                // console.log(data);
                // updateUser(userInfo)
                //     .then(() => {
                //         saveUser(data.name, data.email, data.option);
                //     })
                //     .then(err => console.log(err))

            })
            .catch(error => {
                console.log(error.message)
                setSignUpError(error.message);
            })


    }

    return (
        <div>
            <div className='h-[680px] flex justify-center items-center'>
                <div className='w-96 bg-gray-800 rounded-md p-7'>
                    <h2 className='text-xl text-center font-bold text-cyan-400'>Sign Up</h2>
                    <form onSubmit={handleSubmit(handleSignUp)}>
                        <div className="form-control w-full max-w-xs mt-1">
                            <label className="label"><span className="label-text text-white">Name</span></label>
                            <input type="text" {...register("name", {
                                required: 'Name is required'
                            })} className="input input-bordered input-info w-full max-w-xs" />
                            {errors.name && <p className='text-error'>{errors.name.message}</p>}
                        </div>
                        <div className="form-control w-full max-w-xs mt-2">
                            <label className="label"><span className="label-text text-white">Email</span></label>
                            <input type="email" {...register("email", {
                                required: true
                            })} className="input input-bordered input-info w-full max-w-xs" />
                            {errors.email && <p className='text-error'>{errors.email.message}</p>}
                        </div>
                        <div className="form-control w-full max-w-xs mb-4">
                            <label className="label"><span className="label-text text-white">Password</span></label>
                            <input type="password" {...register("password", {
                                required: 'password is required',
                                minLength: { value: 6, message: 'password must be 6 characters longer' }
                            })} className="input input-bordered input-info w-full max-w-xs" />
                            {errors.password && <p className='text-error'>{errors.password.message}</p>}
                        </div>
                        <input type="submit" className='btn bg-gray-600 w-full' />
                        {signUpError && <p className='text-error'>{signUpError}</p>}
                    </form>
                    <p className='mt-1 text-white'>Already have a account <Link to='/login' className='text-cyan-500 ml-2'>Please Login</Link></p>
                    <div className="divider my-4 text-cyan-400">OR</div>
                    <button onClick={handleGoogleSignIn} className='btn btn-primary w-full'>CONTINUE WITH GOOGLE</button>
                </div>
            </div>
            <hr />
        </div>
    );
};

export default SignUp;