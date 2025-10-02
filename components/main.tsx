export function Main() {
  return (
    <main className="w-3/5 h-[60vh] mt-[5%]">
      <section className="flex items-center justify-between">
        <input
          className="h-12 w-3/5 ml-[10%] rounded-xl text-black pl-3 bg-white dark:bg-cyan-50"
          type="text"
          name="habit"
        />
        <button className="mr-[10%] ml-[5%] w-[15%] h-12 bg-[#0288d1] rounded-xl text-cyan-50 font-bold cursor-pointer hover:bg-[#026aa7] transition-colors">
          Add
        </button>
      </section>

      <section className="mt-[5%] h-3/4 rounded-lg bg-white dark:bg-[#1c1c1c]">
        <h2 className="text-[26px] text-center text-[#0288d1] pt-[3%]">
          MyHabits
        </h2>
        <ul className="text-cyan-50 dark:text-cyan-50 pt-[5%] pl-[7%]">
          <li className="mb-2 text-[#1c1c1c] dark:text-cyan-50">
            Ler 20 minutos
            <a
              href="#"
              className="text-[#b2c330] no-underline hover:underline ml-2"
            >
              Update
            </a>
            <a
              href="#"
              className="text-[#ff4646] no-underline hover:underline ml-2"
            >
              Delete
            </a>
          </li>
          <li className="mb-2 text-[#1c1c1c] dark:text-cyan-50">
            Beber 3l de água
            <a
              href="#"
              className="text-[#b2c330] no-underline hover:underline ml-2"
            >
              Update
            </a>
            <a
              href="#"
              className="text-[#ff4646] no-underline hover:underline ml-2"
            >
              Delete
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}
