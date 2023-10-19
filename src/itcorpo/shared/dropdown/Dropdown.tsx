import React, { ChangeEvent, useState } from 'react'
// import { Currencies, CurrencyContext, useCurrency } from '../../providers/Currencies'

type DropdownProps = {
  items: { [key: string]: string }
  onChanged: (key: string) => void
}

export const Dropdown: React.FC<DropdownProps> = (props) => {
  // const currency = useContext(CurrencyContext) // WRONG
  // const currency = useCurrency()

  const [value, setValue] = useState('')
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = (event.target as HTMLSelectElement).value
    props.onChanged(value)
    setValue(value)
  }

  return (
    <select value={ value } onChange={handleChange}>
      <option></option>
      {Object.entries(props.items).map(([key, value]) =>
        <option key={key} value={key}>{value}</option>)}
    </select>
  )
}
