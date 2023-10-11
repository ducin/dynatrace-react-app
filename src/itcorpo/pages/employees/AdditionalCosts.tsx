// intelliJ: live templates
// vscode: code snippets

import React, { useState } from 'react';
import { CurrencyFormat } from '../../shared/CurrencyFormat';
import { Employee } from 'src/itcorpo/api/dto';

// if you have to scroll up to see your props
// MOST probably your component is too big and it's doing to many things
// and it has too many reasons to rerender

interface AdditionalCostsProps {
  // totalSalary: number
  employees: Employee[]
}

// 100LoC okayish
// 500LoC

// const DataTable=  () => {
//   return <>
//     <DataTable.Header />
//     <DataTable.List />
//     <DataTable.Footer />
//   </>
// }

// <EmployeesDataTable />
 /// get Strato datatable
 // connect it to datasource
 // update localStorage/send events/whatever

export const AdditionalCosts: React.FC<AdditionalCostsProps> = (props) => {
  const { employees } = props

  const [displayAdditionalSummaries, setDisplayAdditionalSummaries] = useState(false)

  const toggleDisplayAdditionalSummaries = () => {
    setDisplayAdditionalSummaries(display => !display)
  }

  const calculateTotalSalary = () => {
    return employees.reduce((sum, e) => sum + e.salary, 0)
  }

  return <>
    <input id="displaySummary" type="checkbox" onClick={toggleDisplayAdditionalSummaries} />
    <label htmlFor="displaySummary">display additional costs</label>
    <ul>
      <li>monthly salary cost: {` `}
        <CurrencyFormat value={calculateTotalSalary()} /></li>
      {displayAdditionalSummaries && <>
        <li>quarterly salary cost: {` `}
          <CurrencyFormat value={calculateTotalSalary() * 3} /></li>
        <li>yearly salary cost: {` `}
          <CurrencyFormat value={calculateTotalSalary() * 12} /></li>
      </>}
    </ul>
  </>
}
