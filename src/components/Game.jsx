import { useState } from "react"
import { Board } from "./Board"
import { level } from "../logics/constants";

export function Game() {

    const [selectedValue, setSelectedValue] = useState('Easy');

    const handleSelectChange = (event) => {
        const newSelectedValue = event.target.value

        setSelectedValue(newSelectedValue);
    };


    return (
        <main className="w-[90%] h-[100%] flex flex-wrap justify-center items-center z-0">
            <div className="w-[100%] flex flex-wrap justify-center items-center">
                <div className="w-[90%]  sm:w-[70%] md:w-[55%]  lg:w-[35%]  mb-3 flex items-center gap-5">
                    <select name="select" value={selectedValue} onChange={handleSelectChange} className="text-black rounded-md">
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                    <p className="font-bold"> 💣 {level[selectedValue].mines} </p>
                </div>
            </div>
            <Board selectedValue={selectedValue} />
        </main>
    )
}
