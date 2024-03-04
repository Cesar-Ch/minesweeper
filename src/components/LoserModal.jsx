import { resetGameStorage } from "../logics/storage";

export function LoserModal() {
    return (
        <div className=" absolute  z-20  top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center " style={{ backgroundColor: 'rgba(0,0,0,.5)' }}>
            <article
                className=" flex justify-center items-center flex-col rounded-lg border border-gray-100 p-10 shadow-sm transition hover:shadow-lg bg-[#202020]   dark:border-gray-800 dark:shadow-gray-200/25 sm:p-11"
            >
                <span
                    className="flex justify-center items-center rounded bg-red-300 p-2 text-white dark:bg-red-400"
                >
                    <h3 className="flex justify-center items-center w-[24px] h-[24px] text-1xl font-bold">F</h3>
                </span>


                <h3 className="mt-0.5 text-lg font-medium text-gray-900 dark:text-white">
                    You Lose
                </h3>


                <button
                    className="inline-block rounded-md bg-white px-4 py-2 text-sm text-blue-400 shadow-sm focus:relative dark:bg-gray-800 hover:bg-gray-700"
                    onClick={() => resetGameStorage()}
                >
                    Reset Game
                </button>



            </article>

        </div>

    )
}