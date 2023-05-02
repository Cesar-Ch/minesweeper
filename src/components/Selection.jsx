const Selection = ({ setViewItem, setMarkMine,setSelectedItem }) => {
    return (
        <div className="flex flex-wrap w-[130px] gap-2 items-center ">
            <div className="w-[50px] h-[50px] rounded-[50%] bg-green-800 flex items-center justify-center text-lg cursor-pointer" onClick={() => setSelectedItem(false)}>✖️</div>
            <div className="w-[50px] h-[50px] rounded-[50%] bg-green-800 flex items-center justify-center text-lg cursor-pointer" onClick={() => setViewItem(true)}>⛏️</div>
            <div className="w-[50px] h-[50px] rounded-[50%] bg-green-800 flex items-center justify-center text-lg cursor-pointer" onClick={() => setMarkMine(true)}>🚩</div>
        </div>
    )
}

export default Selection