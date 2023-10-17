import React, { memo } from 'react'
import { Employee } from '../../api/dto'

import { EmployeeThumbnailImage } from './EmployeeImage'
import { CurrencyFormat } from '../../shared/CurrencyFormat'

type EmployeeRowProps = {
  employee: Employee
  onBenefitClick: (e: Employee) => void
  onDeleteClick: (e: Employee) => void
  onMoneyClick: (e: Employee) => void
}

export const EmployeeRow =
  memo(({ employee: e, onBenefitClick, onDeleteClick, onMoneyClick }: EmployeeRowProps) => <div>
    <EmployeeThumbnailImage employee={e} />
    {e.firstName} {e.lastName},
    {` `}
    {e.title}
    {` `}
    (<CurrencyFormat value={e.salary} />)
    <div>
      <button onClick={() => onBenefitClick(e)}>
        <span role="img" aria-label="benefits">🍕</span>
      </button>
      <button onClick={() => onDeleteClick(e)}>
        <span role="img" aria-label="delete">☠️</span>
      </button>
      <button onClick={() => onMoneyClick(e)}>
        <span role="img" aria-label="money">💰</span>
      </button>
    </div>
  </div>)

EmployeeRow.displayName = 'EmployeeRow'
