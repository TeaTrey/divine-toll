import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
  EyeNoneIcon,
} from "@radix-ui/react-icons";
import { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Car } from "lucide-react";
import dynamic from "next/dynamic";
const Help = dynamic(() => import("@/components/help"), { ssr: false });
import { ReactElement } from "react";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  helpContent?: ReactElement | string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  helpContent,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div
      className={cn("flex items-center justify-start space-x-2 ", className)}
    >
      {column.getIsSorted() === "desc" ? (
        <Button
          variant="ghost"
          onClick={() => column.clearSorting()}
          className="text-center"
        >
          <h2>{title}</h2>
          <ArrowDownIcon className="ml-2 h-4 w-4" />
        </Button>
      ) : column.getIsSorted() === "asc" ? (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(true)}
          className="text-center"
        >
          <h2>{title}</h2>
          <ArrowUpIcon className="ml-2 h-4 w-4" />
        </Button>
      ) : (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(false)}
          className="text-center"
        >
          <h2>{title}</h2>
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )}
      {helpContent && <Help content={helpContent} />}
    </div>
  );
}
