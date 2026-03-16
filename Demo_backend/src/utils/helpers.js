function buildPagination(totalItems, page, limit) {
  const currentPage = Math.max(1, parseInt(page) || 1);
  const perPage = Math.max(1, parseInt(limit) || 10);
  const totalPages = Math.ceil(totalItems / perPage);
  const from = totalItems === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const to = Math.min(currentPage * perPage, totalItems);

  return { currentPage, perPage, from, to, totalItems, totalPages };
}

function getCurrentDateTime() {
  return new Date().toISOString();
}

module.exports = { buildPagination, getCurrentDateTime };
