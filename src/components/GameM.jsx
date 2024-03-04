import { useState } from 'react'
import { Board } from './Board'
import { level } from '../logics/constants'
import { BombIcon } from './icons/BombIcon'
import { FlagIcon } from './icons/FlagIcon'

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

  const handleSelectChange = (event) => {
    const newSelectedValue = event.target.value

    setSelectedValue(newSelectedValue)
  }


  return (
    <main className="w-[90%] h-[100%] flex flex-wrap justify-center items-center z-0">
      <div className="w-[100%] flex flex-wrap justify-center items-center">
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
