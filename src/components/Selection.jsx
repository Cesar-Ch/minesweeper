import { FlagIcon } from "./icons/FlagIcon"
import { PickIcon } from "./icons/PickIcon"
import { XIcon } from "./icons/XIcon"
const Selection = ({ setViewItem, setMarkMine, setSelectedItem }) => {
  return (
        <div className="flex flex-wrap w-[110px] gap-2 items-center ">
            <div className="w-[50px] h-[50px] rounded-[50%] bg-slate-900/80 flex items-center justify-center text-lg cursor-pointer" onClick={() => setSelectedItem(false)}>
              <XIcon />
            </div>
            <div className="w-[50px] h-[50px] rounded-[50%] bg-slate-900/80 flex items-center justify-center text-lg cursor-pointer" onClick={() => setViewItem(true)}>
              <PickIcon />
            </div>
            <div className="w-[50px] h-[50px] rounded-[50%] bg-slate-900/80 flex items-center justify-center text-lg cursor-pointer" onClick={() => setMarkMine(true)}>
              <FlagIcon />
            </div>
        </div>
  )
}

export default Selection
