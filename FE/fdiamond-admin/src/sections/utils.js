export const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

export function emptyRows(page, rowsPerPage, arrayLength) {
  return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}

function descendingComparator(a, b, orderBy) {
  if (a[orderBy] === null) {
    return 1;
  }
  if (b[orderBy] === null) {
    return -1;
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
export function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function applyFilter({
  inputData,
  comparator,
  filterById,
  filterName,
  filterByOrderId,
  filterFirstName,
  filterByName,
}) {
  if (!Array.isArray(inputData)) {
    console.error('applyFilter expects inputData to be an array, but received:', inputData);
    return [];
  }
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterByName) {
    inputData = inputData.filter((data) => {
      if (!data.productName) {
        console.warn('Data item missing productName:', data);
        return false;
      }
      return data.productName.toLowerCase().indexOf(filterByName.toLowerCase()) !== -1;
    });
  }

  if (filterByOrderId) {
    inputData = inputData.filter((data) => {
      if (!data.orderId) {
        console.warn('Data item missing orderId:', data);
        return false;
      }
      return data.orderId.toString().indexOf(filterByOrderId) !== -1;
    });
  }

  if (filterName) {
    inputData = inputData.filter(
      (data) => {
        if (!data.discountCodeName) {
          console.warn('Data item missing discountCodeName:', data);
          return false;
        }
        return data.discountCodeName.toLowerCase().indexOf(filterName.toLowerCase()) !== -1;
      }
      // (user) => user.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterFirstName) {
    inputData = inputData.filter(
      (data) => {
        if (!data.firstName) {
          console.warn('Data item missing first name:', data);
          return false;
        }
        return data.firstName.toLowerCase().indexOf(filterFirstName.toLowerCase()) !== -1;
      }
      // (user) => user.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  return inputData;
}
