import React, { memo } from "react";
import currency from 'currency.js'
import { useCurrency } from "../providers/Currencies";

type CurrencyFormatProps = {
  value: number // 10
}

export const CurrencyFormat: React.FC<CurrencyFormatProps> =
memo(({ value }) => {
  const { convert, selectedCurrencySymbol } = useCurrency() // EUR
  return <>{currency(convert(value), { separator: ',', symbol: selectedCurrencySymbol }).format()}</>
})
CurrencyFormat.displayName = 'CurrencyFormat'

// what is memo doing:
// - (C) -> C
// - RAM cost: caching VDOM (result of building the JSX), props
// - CPU cost: comparing props by reference (shallow equality ===)

// Architecture Decision Records - ADR

// export const CurrencyFormat: React.FC<CurrencyFormatProps> = ({value}) => {
//   const {convert, selectedCurrencyCode, selectedCurrencySymbol} = useCurrency();
//   const [convertedValue, setConvertedValue] = useState<number>(value);

//   useEffect(() => {
//       setConvertedValue(convert(value));
//   }, [selectedCurrencyCode, value]);

//   return <>{convertedValue && currency(convertedValue, {separator: ',', symbol: selectedCurrencySymbol}).format()}</>
// }