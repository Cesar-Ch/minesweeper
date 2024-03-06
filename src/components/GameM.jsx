import { useState, useEffect } from 'react'
import { Board } from './Board'
import { level } from '../logics/constants'
import { BombIcon } from './icons/BombIcon'
import { FlagIcon } from './icons/FlagIcon'
import { UserIcon } from './icons/UserIcon'

export function GameM() {
  const [selectedValue, setSelectedValue] = useState(() => {
    const selectedValueFromStorage = window.localStorage.getItem('selectedValue')
    if (selectedValueFromStorage) return selectedValueFromStorage
    return 'Easy'
  })
  const [markedFlags, setMarkedFlags] = useState(() => {
    const markedFlagsFromStorage = window.localStorage.getItem('markedFlags')
    if (markedFlagsFromStorage) return Number(markedFlagsFromStorage)
    return 0
  })

  const [user, setUser] = useState({
    email: "",
    username: ""
  })

  const handleSelectChange = (event) => {
    const newSelectedValue = event.target.value

    setSelectedValue(newSelectedValue)
  }

  const getProfile = async () => {
    try {
      const response = await fetch('/minesweeper/api/profile', {
        method: 'GET',
      }
      )
      const data = await response.json()
      setUser(data)
    }
    catch (error) {
      console.error(error)
    }
  }


  const logout = async () => {
    try {
      const response = await fetch('/minesweeper/api/logout', {
        method: 'POST',
      }
      )
      if (response.ok) {
        window.location.reload()
      }
      const data = await response.json()

      console.log(data)
    }
    catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    getProfile()
  }, [])


  return (
    <main className="w-[90%] h-[100%] flex flex-wrap justify-center items-center z-0">
      <div className='absolute top-7 gap-3 lg:w-[50%] w-[90%] flex justify-between '>
        <div className='flex gap-3'>
          <UserIcon />
          <h1>{user.username}</h1>
        </div>
        <div>
          <button onClick={() => logout()}>Logout</button>
        </div>
      </div>
      <div className="w-[100%] flex flex-wrap justify-center items-center mt-7">
        <div className="w-[90%]  sm:w-[70%] md:w-[55%]  lg:w-[35%]  mb-3 flex items-center gap-5">
          <select name="select" value={selectedValue} onChange={handleSelectChange} className="   border font-bold text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-300 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <p className="font-bold flex gap-2"> <BombIcon /> {level[selectedValue].mines} </p>
          <p className='font-bold flex gap-2'> <FlagIcon /> {markedFlags}</p>
        </div>
      </div>
      <Board selectedValue={selectedValue} setMarkedFlags={setMarkedFlags} markedFlags={markedFlags} />
    </main>
  )
}
