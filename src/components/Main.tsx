import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Pencil, Trash2 } from "lucide-react";

export function Main() {
  return (
    <main className="w-4/5 h-[60vh] md:w-3/5 md:h-[60vh] mt-[5%]">
      <section className="flex items-center justify-between">
        <input
          className="h-8 md:h-12 w-3/5 ml-[10%] rounded-xl text-black pl-3 bg-cyan-50"
          type="text"
          name="habit"
        />
        <button className="h-8 text-sm md:text-xl mr-[10%] ml-[5%] w-[15%] md:h-12 bg-[#0288d1] rounded-xl text-cyan-50 font-bold cursor-pointer hover:bg-[#026aa7] transition-colors">
          Add
        </button>
      </section>

      <section className="mt-[10%] md:mt-[5%] h-3/4 rounded-lg bg-[#1c1c1c]">
        <h2 className="text-[26px] text-center text-[#0288d1] pt-[3%]">
          MyHabits
        </h2>
        <ul className="pt-[5%] pl-[7%]">
          <li className="mb-2 text-cyan-50">
            Ler 20 minutos
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild className="ml-2 cursor-pointer">
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4 " />
                  </Button>
                </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild className="ml-1 cursor-pointer">
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 " />
                  </Button>
                </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>
          </li>
          <li className="mb-2 text-cyan-50">
            Beber 3l de água
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild className="ml-2 cursor-pointer">
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4 " />
                  </Button>
                </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild className="ml-1 cursor-pointer">
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 " />
                  </Button>
                </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </section>
    </main>
  );
}
