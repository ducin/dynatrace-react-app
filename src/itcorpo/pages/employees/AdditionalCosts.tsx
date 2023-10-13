// intelliJ: live templates
// vscode: code snippets

import React, { memo, useMemo, useState } from 'react';
import { CurrencyFormat } from '../../shared/CurrencyFormat';
import { Employee } from 'src/itcorpo/api/dto';

// if you have to scroll up to see your props
// MOST probably your component is too big and it's doing to many things
// and it has too many reasons to rerender

interface AdditionalCostsProps {
  // totalSalary: number
  employees: Employee[] // RECOMMENDATION
  // label: string | JSX.Element
  label: React.ReactNode
}

// DEFENSIVE PROGRAMMING
// - don't be happy with the code that works correctly TODAY
// - considedr HOW could the requirements CHANGE in the future
// SOL_I_D - acronym :)
interface AdditionalCostsProps_ {
  // salaries: number[]
  // contractTYpe: ContractTYpe[]
  employees: { salary: number }[]
  // employees: Pick<Employee, 'salary'>[]
  // compile-time - OK
  // runtime - OK
}

// ORDER instructions verbs ; - imperative / OOP
// DECLARATION, nouns FP
// JS - mixed-lang. - FP + OOP // prettier

// const useToggle = (???) => {
//   // private API
//   ???
//   // public API
//   return ???
// }

const useToggle = (init = false) => {
  // private API
  const [value, setValue] = useState(init);
  const toggleValue = () => {
    setValue((prev) => !prev);
  }
  // public API
  return [ value, toggleValue ] as const
  // return { value, toggleValue }
}

export const AdditionalCosts: React.FC<AdditionalCostsProps> =
memo((props) => {
  const { employees, label } = props

  const [displayAdditionalSummaries, toggleDisplayAdditionalSummaries] = useToggle()
  // const {
  //   value: displayAdditionalSummaries,
  //   toggleValue: setDisplayAdditionalSummaries
  // } = useToggle()
  // const [displayAdditionalSummaries, setDisplayAdditionalSummaries] = useState(false)

  // // useCallback - makes sense as FUTURE PROOF idea
  // const toggleDisplayAdditionalSummaries = () => { // void => side effect
  //   setDisplayAdditionalSummaries(display => !display)
  // }

  // useMemo - keep stable REFERENCES // REFERENTIAL EQUALITY
  // const flags = useMemo(() => ({
  //   isEnabled,
  //   isChecked
  // }, [isEnabled, isChecked])
  // useMemo - calculations
  // useCallback makes NOOOOO SENSE applied to calculations
  const totalSalary = useMemo(() => {
    return employees.reduce((sum, e) => sum + e.salary, 0)
  }, [employees])
  // you shall NEVER MUTATE ANYTHING

  // const totalSalary = calculateTotalSalary()
  // const totalSalary = employees.reduce((sum, e) => sum + e.salary, 0)

  // React.Fragment
  return <>
    {/* <h2>Additional Costs</h2> */}
    {label}
    {/* {React.createElement("input")} */}
    <input
      id="displaySummary"
      type="checkbox"
      onClick={toggleDisplayAdditionalSummaries}
      checked={displayAdditionalSummaries}
    />
    <label htmlFor="displaySummary">display additional costs</label>
    <ul>
      <li>monthly salary cost: {` `}
        <CurrencyFormat value={totalSalary} /></li>
      {displayAdditionalSummaries && <>
        <li>quarterly salary cost: {` `}
          <CurrencyFormat value={totalSalary * 3} /></li>
        <li>yearly salary cost: {` `}
          <CurrencyFormat value={totalSalary * 12} /></li>
      </>}

    </ul>
  </>
})
AdditionalCosts.displayName = 'AdditionalCosts__MEMO'
