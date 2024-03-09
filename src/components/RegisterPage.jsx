import { useState } from "react";


const RegisterPage = () => {
    const styleInput = `w-full p-2.5 text-sm rounded-lg bg-[#2b2b2b] border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 `;
    const styleLabel = `block mb-2 text-sm font-medium  text-white`;

    const [credentials, setCredentials] = useState({
        name: '',
        lastname: '',
        username: '',
        email: '',
        password: ''
    })
    const [isRegistered, setIsRegistered] = useState(false)
    const [error, setError] = useState(false)
    const handleChange = (e) => {
        console.log(e.target.name);
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ credentials })
            })
            if (response.status === 200) {
                setIsRegistered(true)
            }
            if (response.status === 500) {
                setError(true)
            }
        }
        catch (error) {
            setError(true)
        }
    }

    return (
        <>
            {
                isRegistered ? <h1 className="text-white text-3xl font-bold m-10" >Gracias por registrate</h1> : <>
                    <h1 className="text-white text-3xl font-bold m-10">Sign Up</h1>
                    <form onSubmit={handleSubmit} className="w-[600px] mx-auto justify-between rounded-lg flex flex-wrap gap-2">
                        <div className="mb-5 w-[45%]">
                            <label htmlFor="name" className={styleLabel}>Your First name</label>
                            <input onChange={handleChange}
                                type="text"
                                id="name"
                                name="name"
                                className={styleInput}
                                placeholder=""
                                required
                            />
                        </div>
                        <div className="mb-5 w-[45%]">
                            <label htmlFor="lastname" className={styleLabel}>Your Last name</label>
                            <input onChange={handleChange}
                                type="text"
                                id="lastname"
                                name="lastname"
                                className={styleInput}
                                placeholder=""
                                required
                            />
                        </div>
                        <div className="mb-5 w-full">
                            <label htmlFor="username" className={styleLabel}>Your username</label>
                            <input onChange={handleChange}
                                type="text"
                                id="username"
                                name="username"
                                className={styleInput}
                                placeholder=""
                                required
                            />
                        </div>
                        <div className="mb-5 w-full">
                            <label htmlFor="email" className={styleLabel}>Your email</label>
                            <input onChange={handleChange}
                                type="email"
                                id="email"
                                name="email"
                                className={styleInput}
                                placeholder=""
                                required
                            />
                        </div>
                        <div className="mb-5 w-full">
                            <label htmlFor="password" className={styleLabel}>Your password</label>
                            <input onChange={handleChange} type="password" id="password" name="password" className={styleInput} required />
                        </div>

                        <button
                            type="submit"
                            className="text-black focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center bg-zinc-100 hover:bg-zinc-200 focus:ring-zinc-300"
                        >Register</button>
                        {
                            error ? <p className="text-red-500 block text-sm font-medium">Error al registrar: username o email en uso</p> : null
                        }

                    </form></>
            }

        </>
    )
}

export default RegisterPage