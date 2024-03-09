import { useState } from "react";

const LoginPage = () => {
    const styleInput = `w-full p-2.5 text-sm rounded-lg bg-[#2b2b2b] border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 `;
    const styleLabel = `block mb-2 text-sm font-medium  text-white`;

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        console.log(e.target.name);
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(credentials)
        try {
            const response = await fetch('/minesweeper/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ credentials })
            })
            if (response.status === 200) {
                window.location.reload()
                console.log('Login successful')
            }

            console.log(response)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <h1 className="text-white text-3xl font-bold m-10">Log In</h1>
            <form onSubmit={handleSubmit} className="w-[300px] mx-auto rounded-lg">
                <div className="mb-5">
                    <label htmlFor="email" className={styleLabel}>Your email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className={styleInput}
                        placeholder=""
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className={styleLabel}>Your password</label>
                    <input type="password" id="password" name="password" className={styleInput} required onChange={handleChange} />
                </div>

                <button
                    type="submit"
                    className="text-black focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center bg-zinc-100 hover:bg-zinc-200 focus:ring-zinc-300"
                >Login</button>
                
            </form>
        </>
    )
}

export default LoginPage