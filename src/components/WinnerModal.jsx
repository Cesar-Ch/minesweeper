export function WinnerModal() {
    return (
        <div className=" absolute  z-20  top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center " style={{ backgroundColor: 'rgba(0,0,0,.5)' }}>
            <article
                class="rounded-lg border border-gray-100 p-10 shadow-sm transition hover:shadow-lg bg-[#202020] dark:border-gray-800 dark:shadow-gray-200/25 sm:p-11 "
            >
                <span
                    class="inline-block rounded bg-yellow-300 p-2 text-white dark:bg-yellow-400 "
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-crown" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="npne"></path>
                        <path d="M12 6l4 6l5 -4l-2 10h-14l-2 -10l5 4z"></path>
                    </svg>
                </span>


                <h3 class="mt-0.5 text-lg font-medium text-gray-900 dark:text-white p-3">
                    You Win
                </h3>

                <button
                    class="inline-block rounded-md bg-white px-4 py-2 text-sm text-blue-400 shadow-sm focus:relative dark:bg-gray-800 hover:bg-gray-700" onClick={() => location.reload()}
                >
                    Reset Game
                </button>


            </article>
        </div>

    )
}