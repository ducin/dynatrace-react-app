import { Reducer, useReducer } from "react"

// private API
type EmployeeFilters = { email: string }
type EmployeeFilterActions = { type: "SET_EMAIL", value: string }
const employeeFilterReducer: Reducer<EmployeeFilters, EmployeeFilterActions> = 
  (state, action): EmployeeFilters => { 
    switch (action.type){
      case 'SET_EMAIL': return {...state, email: action.value}
      default: return state
    }
  }
// public API:
export function useEmployeeFilters(){
  return useReducer(employeeFilterReducer, { email: '' })
}
