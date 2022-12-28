import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';

const About = () => {
    const { user } = useContext(AuthContext)
    console.log(user);
    const [services, setServices] = useState({})
    console.log(services);
    useEffect(() => {
        fetch(`https://socail-projects-server.vercel.app/about/${user?.email}`)
            .then(res => res.json())
            .then(data => setServices(data))
    }, [user?.email, services]);



    const handleAddress = (event) => {
        event.preventDefault();
        const form = event.target;

        const name = form.name.value;
        const email = form.email.value;
        const address = form.address.value;
        const u = form.university.value;

        const abouts = {
            name,
            email,
            u,
            address
        }

        fetch(`https://socail-projects-server.vercel.app/about/${services._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(abouts)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    toast.success('update Success', { autoClose: 1000 })
                    const newReview = [...services, data]
                    setServices(newReview)
                    form.reset()

                }


            })
    }




    return (
        <div className='my-28'>

            <div data-theme="night" className="container flex flex-col w-full max-w-lg p-6 mx-auto divide-y rounded-md divide-gray-700 dark:bg-gray-900 dark:text-gray-100">
                <div className="flex justify-between p-4">
                    <div className="flex items-center space-x-4">
                        <div>
                            <img src="https://source.unsplash.com/100x100/?portrait" alt="" className="object-cover w-12 h-12 rounded-full dark:bg-gray-500" />
                        </div>
                        <div>
                            <h4 className="font-bold text-xl">Name : {services.name}</h4>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 dark:text-yellow-500">
                        <label htmlFor="my-modal-3" className="text-sm font-bold btn">
                            Edit
                        </label>
                    </div>
                </div>
                <div className="p-4 space-y-2 text-sm dark:text-gray-400">
                    <p className='text-xl text-white'>Email: {services.email}</p>
                    <p className='text-xl text-white'>University: {services.u}</p>
                    <p className='text-xl text-white'>Address: {services.address}</p>
                </div>
            </div>

            <div data-theme="cupcake">
                <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                <div className="modal">
                    <div className="modal-box relative">
                        <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <form className='mt-4' onSubmit={handleAddress}>
                            <input type="text" name="name" defaultValue={services.name} className="input input-bordered w-full border-4 border-indigo-500/100" />
                            <input type="email" name="email" defaultValue={services.email} className="my-2 input input-bordered w-full border-4 border-indigo-500/100" />
                            <input type="text" name="university" defaultValue={services.u} className="input input-bordered w-full border-4 border-indigo-500/100" />
                            <input type="text" name="address" defaultValue={services.address} className="my-2 input input-bordered w-full border-4 border-indigo-500/100" />
                            <input type="submit" value="Save" className='btn btn-error font-bold w-full' />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;