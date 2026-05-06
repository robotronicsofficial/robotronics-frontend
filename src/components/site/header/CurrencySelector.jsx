import { Globe } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  SUPPORTED_CURRENCIES,
  selectCurrencyCode,
  useCurrencyStore,
} from "@/stores/currencyStore";

/* Compact currency switcher for the header. Trigger shows the active
   code; the menu lists code + descriptive label so a first-time user
   knows what each abbreviation means. The icon is a single tell that
   the control is region/locale, not generic settings. */
const CurrencySelector = () => {
  const code = useCurrencyStore(selectCurrencyCode);
  const setCode = useCurrencyStore((state) => state.setCode);

  return (
    <Select value={code} onValueChange={setCode}>
      <SelectTrigger
        size="sm"
        aria-label="Currency"
        className="h-9 gap-2 rounded-full px-3"
      >
        <Globe aria-hidden="true" className="size-3.5 text-muted-foreground" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end" className="min-w-44">
        {SUPPORTED_CURRENCIES.map((currency) => (
          <SelectItem key={currency.code} value={currency.code}>
            <span className="flex items-center gap-2">
              <span className="font-semibold tabular-nums">{currency.code}</span>
              <span className="text-muted-foreground">{currency.label}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CurrencySelector;
