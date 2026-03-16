const { getUsers, getNextId } = require('../data/users');
const { buildPagination, getCurrentDateTime } = require('../utils/helpers');

// POST /api/users/list
exports.listUsers = (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'name',
      sortOrder = 'asc',
      search,
      phone,
      email,
      status,
      country,
      state
    } = req.body;

    let filtered = [...getUsers()];

    // Filter: search by name (partial, case-insensitive)
    if (search && search.trim()) {
      const term = search.trim().toLowerCase();
      filtered = filtered.filter(u => u.name.toLowerCase().includes(term));
    }

    // Filter: phone (partial match)
    if (phone && phone.trim()) {
      filtered = filtered.filter(u => u.phone.includes(phone.trim()));
    }

    // Filter: email (partial, case-insensitive)
    if (email && email.trim()) {
      const term = email.trim().toLowerCase();
      filtered = filtered.filter(u => u.email.toLowerCase().includes(term));
    }

    // Filter: status (exact match, 0 or 1)
    if (status !== undefined && status !== null && status !== '') {
      filtered = filtered.filter(u => u.status === parseInt(status));
    }

    // Filter: country (exact, case-insensitive)
    if (country && country.trim()) {
      filtered = filtered.filter(u =>
        u.country.toLowerCase() === country.trim().toLowerCase()
      );
    }

    // Filter: state (exact, case-insensitive)
    if (state && state.trim()) {
      filtered = filtered.filter(u =>
        u.state.toLowerCase() === state.trim().toLowerCase()
      );
    }

    // Sorting
    const validSortFields = ['name', 'role', 'number', 'phone', 'email', 'status'];
    const field = validSortFields.includes(sortBy) ? sortBy : 'name';
    const actualField = field === 'number' ? 'phone' : field;
    const order = sortOrder === 'desc' ? -1 : 1;

    filtered.sort((a, b) => {
      let valA = a[actualField];
      let valB = b[actualField];

      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();

      if (valA < valB) return -1 * order;
      if (valA > valB) return 1 * order;
      return 0;
    });

    // Pagination
    const totalItems = filtered.length;
    const pageNum = Math.max(1, parseInt(page) || 1);
    const perPage = Math.max(1, parseInt(limit) || 10);
    const startIndex = (pageNum - 1) * perPage;
    const paginatedItems = filtered.slice(startIndex, startIndex + perPage);
    const pagination = buildPagination(totalItems, pageNum, perPage);

    res.json({ success: true, data: paginatedItems, pagination });
  } catch (err) {
    next(err);
  }
};

// GET /api/users/:id
exports.getUserById = (req, res, next) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    const error = new Error('Invalid user ID');
    error.statusCode = 400;
    return next(error);
  }

  const user = getUsers().find(u => u.id === id);

  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    return next(error);
  }

  res.json({ success: true, data: user });
};

// POST /api/users/add
exports.addUser = (req, res, next) => {
  try {
    const { name, email, phone, role, addressNo, streetName, city, state, country, pincode } = req.body;

    if (!name || !email || !phone || !role) {
      const error = new Error('Fields name, email, phone, and role are required');
      error.statusCode = 400;
      return next(error);
    }

    const existingUser = getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      const error = new Error('A user with this email already exists');
      error.statusCode = 400;
      return next(error);
    }

    const newUser = {
      id: getNextId(),
      name,
      email,
      phone,
      role,
      addressNo: addressNo || '',
      streetName: streetName || '',
      city: city || '',
      state: state || '',
      country: country || '',
      pincode: pincode || '',
      status: 1,
      createdBy: name,
      createdAt: getCurrentDateTime(),
      updatedBy: null,
      updatedAt: null
    };

    getUsers().push(newUser);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/users/edit
exports.editUser = (req, res, next) => {
  try {
    const { id, name, email, phone, role, addressNo, streetName, city, state, country, pincode } = req.body;

    if (!id) {
      const error = new Error('User ID is required');
      error.statusCode = 400;
      return next(error);
    }

    if (!name || !email || !phone || !role) {
      const error = new Error('Fields name, email, phone, and role are required');
      error.statusCode = 400;
      return next(error);
    }

    const users = getUsers();
    const index = users.findIndex(u => u.id === parseInt(id));

    if (index === -1) {
      const error = new Error('User not found');
      error.statusCode = 404;
      return next(error);
    }

    const emailDuplicate = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.id !== parseInt(id)
    );
    if (emailDuplicate) {
      const error = new Error('A user with this email already exists');
      error.statusCode = 400;
      return next(error);
    }

    users[index] = {
      ...users[index],
      name,
      email,
      phone,
      role,
      addressNo: addressNo || '',
      streetName: streetName || '',
      city: city || '',
      state: state || '',
      country: country || '',
      pincode: pincode || '',
      updatedBy: name,
      updatedAt: getCurrentDateTime()
    };

    res.json({
      success: true,
      message: 'User updated successfully',
      data: users[index]
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/users/update-status
exports.updateStatus = (req, res, next) => {
  const { id, status } = req.body;

  if (!id || (status !== 0 && status !== 1)) {
    const error = new Error('Valid id and status (0 or 1) are required');
    error.statusCode = 400;
    return next(error);
  }

  const users = getUsers();
  const user = users.find(u => u.id === parseInt(id));

  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    return next(error);
  }

  user.status = status;
  user.updatedAt = getCurrentDateTime();

  res.json({
    success: true,
    message: `User status updated to ${status === 1 ? 'active' : 'inactive'}`,
    data: user
  });
};

// DELETE /api/users/:id
exports.deleteUser = (req, res, next) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    const error = new Error('Invalid user ID');
    error.statusCode = 400;
    return next(error);
  }

  const users = getUsers();
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    const error = new Error('User not found');
    error.statusCode = 404;
    return next(error);
  }

  const deletedUser = users.splice(index, 1)[0];

  res.json({
    success: true,
    message: 'User deleted successfully',
    data: deletedUser
  });
};
