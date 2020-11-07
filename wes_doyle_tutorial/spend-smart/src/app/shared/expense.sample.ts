export const EXPENSE_SAMPLE_DATA = [
  {
    id: 1, company: { id: 1, name: 'Pizza Palace' },
    amount: 25, date: new Date(2020, 11, 6), type: 'Restaurant'
  },
  {
    id: 2, company: { id: 1, name: 'Pizza Palace' },
    amount: 21, date: new Date(2020, 11, 4), type: 'Restaurant'
  },
  {
    id: 3, company:
      { id: 2, name: 'Pollo Tropical' },
    amount: 17, date: new Date(2020, 11, 1), type: 'Restaurant'
  },
  {
    id: 4, company:
      { id: 3, name: 'Amazon' },
    amount: 100, date: new Date(2020, 11, 1), type: 'Other'
  },
  {
    id: 5, company:
      { id: 4, name: 'Metro' },
    amount: 120, date: new Date(2020, 11, 1), type: 'Grocery'
  }
];
