import { APIEndPoints } from 'src/enums/enums';

export const BASE_URL = import.meta.env.VITE_BASE_URL || '/';

export const API_FINANCE_URL = BASE_URL + '/' + APIEndPoints.FINANCE;
export const API_GARAGE_URL = BASE_URL + '/' + APIEndPoints.GARAGE;
export const API_MARKET_URL = BASE_URL + '/' + APIEndPoints.MARKET;
export const API_HISTORY_URL = BASE_URL + '/' + APIEndPoints.HISTORY;

//finance parts
export const API_EXPENSE_URL = API_FINANCE_URL + '/' + APIEndPoints.EXPENSE;
export const API_INCOME_URL = API_FINANCE_URL + '/' + APIEndPoints.INCOME;
export const API_PURCHASE_URL = API_FINANCE_URL + '/' + APIEndPoints.PURCHASE;
