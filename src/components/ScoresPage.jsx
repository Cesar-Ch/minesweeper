import { useEffect, useState } from "react";


const ScoresPage = () => {
    
    const [scores, setScores] = useState([])
    const [selectedValue, setSelectedValue] = useState('Easy')
    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value)
    }
    const getScores = async (level) => {
        try {
            const response = await fetch(
                `/api/score?level=${level}`,
                {
                    method: "GET",
                },
            );
            const data = await response.json();
            const { rowWinner } = data
            setScores(rowWinner);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getScores(selectedValue);
    }, [selectedValue])
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">

            <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                <caption
                    className="p-5 text-lg font-semibold text-left rtl:text-righttext-white bg-gray-800"
                >

                    <select name="select" value={selectedValue} onChange={handleSelectChange}  className="border font-bold text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-300 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>

                </caption>
                <thead className="text-xs uppercase bg-gray-800 text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3"> Username</th>
                        <th scope="col" className="px-6 py-3"> Time</th>
                        <th scope="col" className="px-6 py-3"> Level</th>
                    </tr>
                </thead>
                <tbody>

                    {scores.map((score,i) => (
                        <tr className="border-b bg-gray-800 border-gray-700" key={i}>
                            <th
                                scope="row"
                                className="px-6 py-4 font-medium whitespace-nowrap text-white"
                            >
                                {score.username}
                            </th>
                            <td className="px-6 py-4"> {score.time}</td>
                            <td className="px-6 py-4"> {score.level}</td>

                        </tr>)
                    )
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ScoresPage