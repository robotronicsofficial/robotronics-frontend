import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  SUPPORTED_CURRENCIES,
  selectCurrencyCode,
  useCurrencyStore,
} from "@/stores/currencyStore";

/* Header micro-control. Reuses the Resources-nav dropdown shape so the
   header reads as one consistent piece — no form-input borders, no
   verbose Intl.NumberFormat row, just a tight code + label per item. */
const CurrencySelector = () => {
  const code = useCurrencyStore(selectCurrencyCode);
  const setCode = useCurrencyStore((state) => state.setCode);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Currency"
        className="group inline-flex h-9 items-center gap-1 rounded-md px-2.5 text-body-sm font-medium text-muted-foreground outline-none transition-[padding,gap] duration-200 ease-out hover:bg-muted hover:text-foreground data-[state=open]:bg-muted data-[state=open]:text-foreground group-data-[scrolled]/header:gap-0 group-data-[scrolled]/header:px-1.5"
      >
        {code}
        <ChevronDown
          aria-hidden="true"
          className="size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180 group-data-[scrolled]/header:hidden"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44 p-1">
        {SUPPORTED_CURRENCIES.map((currency) => {
          const active = currency.code === code;
          return (
            <DropdownMenuItem
              key={currency.code}
              onSelect={() => setCode(currency.code)}
              className={cn(
                "flex items-center justify-between gap-3 rounded-sm px-2.5 py-1.5",
                active && "bg-secondary",
              )}
            >
              <span className="font-semibold tabular-nums text-foreground">
                {currency.code}
              </span>
              <span className="text-caption text-muted-foreground">
                {currency.label}
              </span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CurrencySelector;
