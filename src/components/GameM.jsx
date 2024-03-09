import { useState, useEffect } from 'react'
import { Board } from './Board'
import { level } from '../logics/constants'
import { BombIcon } from './icons/BombIcon'
import { FlagIcon } from './icons/FlagIcon'
import { UserIcon } from './icons/UserIcon'
import { resetGameStorage } from "../logics/storage";
import { LogoutIcon } from './icons/Logout'

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

  const [time, setTime] = useState(() => {
    const timeFromStorage = window.localStorage.getItem('time')
    if (timeFromStorage) return timeFromStorage
    return '00:00:00'
  })
  const [start, setStart] = useState(false)
  const [winner, setWinner] = useState(false)

  const startGame = () => {
    setStart(true)
  }

  const [user, setUser] = useState({
    user_id: 0,
    email: "",
    username: ""
  })

  const handleSelectChange = (event) => {
    const newSelectedValue = event.target.value
    setTime('00:00:00')
    setSelectedValue(newSelectedValue)
  }

  const getProfile = async () => {
    try {
      const response = await fetch('/minesweeper/api/profile', {
        method: 'GET',
      }
      )
      const data = await response.json()
      console.log(data)
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

  useEffect(() => {
    if (!start) return
    if (winner) return
    const timer = setInterval(() => {
      let newSecond = Number(time.split(':')[2]) + 1
      let newMinute = Number(time.split(':')[1])
      let newHour = Number(time.split(':')[0])
      if (newSecond === 60) {
        newMinute = newMinute + 1
        newSecond = 0
      }
      if (newMinute === 60) {
        newHour = newHour + 1
        newMinute = 0
      }
      setTime(`${newHour.toString().padStart(2, '0')}:${newMinute.toString().padStart(2, '0')}:${newSecond.toString().padStart(2, '0')}`)
    }, 1000)
    return () => clearInterval(timer)

  }, [time, start,winner])
  console.log(user)

  return (
    <main className="w-[90%] h-[100%] flex flex-wrap justify-center items-center z-0">
      <div className='absolute top-7 gap-3 lg:w-[50%] w-[90%] flex justify-between '>
        <div className='flex gap-3 py-2.5'>
          <UserIcon />
          <h1>{user.username}</h1>
        </div>
        <div>
          <button className='flex gap-2 hover:text-white border   focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 border-red-500 text-red-500 dark:hover:text-white hover:bg-red-600 focus:ring-red-900' onClick={() => logout()}>
            <LogoutIcon />
            Logout
          </button>
        </div>
      </div>

      <div className="w-[100%] flex flex-wrap justify-center items-center mt-7">
        <div className="w-[90%]  sm:w-[70%] md:w-[55%]  lg:w-[35%]  mb-3 flex items-center gap-5">
          <select name="select" value={selectedValue} onChange={handleSelectChange} className="border font-bold text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-300 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          {!start ? <button className="text-white focus:outline-none focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 bg-slate-700 hover:bg-slate-600 focus:ring-gray-700 border-gray-400 border-2" onClick={() => startGame()} >Start</button> : <button className="text-white focus:outline-none focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 bg-slate-700 hover:bg-slate-600 focus:ring-gray-700 border-gray-400 border-2" onClick={() => resetGameStorage()} >Reset</button>}

          <p className="font-bold flex gap-2 ">{time}</p>
          <p className="font-bold flex gap-2"> <BombIcon /> {level[selectedValue].mines} </p>
          <p className='font-bold flex gap-2'> <FlagIcon /> {markedFlags}</p>
        </div>
      </div>
      {
        !start ? <div className="flex flex-wrap justify-center items-center  border-gray-600 border-4 rounded-md w-[90%] h-[90%] sm:w-[70%] md:w-[55%]  lg:w-[35%] text-center">
        </div> : <Board selectedValue={selectedValue} setMarkedFlags={setMarkedFlags} markedFlags={markedFlags} user={user} time={time} winner={winner} setWinner={setWinner} />

      }

    </main>
  )
}
