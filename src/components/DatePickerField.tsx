
import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Tooltip } from "react-tooltip";

type DatePickerFieldProps = {
  id: string;
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  required?: boolean;
  tooltip?: string;
};

const DatePickerField = ({
  id,
  label,
  value,
  onChange,
  required = false,
  tooltip,
}: DatePickerFieldProps) => {
  const [open, setOpen] = useState(false);
  const tooltipId = `${id}-tooltip`;

  return (
    <div className="flex flex-col space-y-1.5">
      <div className="flex items-center">
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
        
        {tooltip && (
          <>
            <span
              className="ml-2 cursor-help text-muted-foreground"
              data-tooltip-id={tooltipId}
              data-tooltip-content={tooltip}
            >
              ?
            </span>
            <Tooltip id={tooltipId} />
          </>
        )}
      </div>
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, "PPP") : <span>Select date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value || undefined}
            onSelect={(date) => {
              onChange(date);
              setOpen(false);
            }}
            initialFocus
            className="pointer-events-auto"
            fromYear={1950}
            toYear={2050}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePickerField;
