const API_URL = '/api';


export async function apiFetch(endpoint, options = {}) {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const headers = {
    ...(options.headers || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Don't set Content-Type for FormData (browser sets it with boundary)
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

// Auth
export const authAPI = {
  register: (data) => apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data) => apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  googleAuth: (data) => apiFetch('/auth/google', { method: 'POST', body: JSON.stringify(data) }),
  getMe: () => apiFetch('/auth/me'),
  updateProfile: (formData) => apiFetch('/auth/profile', { method: 'PUT', body: formData }),
  getUserProfile: (id) => apiFetch(`/auth/user/${id}`),
};

// Listings
export const listingsAPI = {
  getAll: (params) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/listings?${query}`);
  },
  getOne: (id) => apiFetch(`/listings/${id}`),
  getMine: () => apiFetch('/listings/my'),
  create: (formData) => apiFetch('/listings', { method: 'POST', body: formData }),
  update: (id, formData) => apiFetch(`/listings/${id}`, { method: 'PUT', body: formData }),
  delete: (id) => apiFetch(`/listings/${id}`, { method: 'DELETE' }),
  markAsSold: (id) => apiFetch(`/listings/${id}/sold`, { method: 'PUT' }),
};

// Messages
export const messagesAPI = {
  getConversations: () => apiFetch('/messages/conversations'),
  getMessages: (conversationId) => apiFetch(`/messages/conversations/${conversationId}`),
  startConversation: (data) => apiFetch('/messages/conversations', { method: 'POST', body: JSON.stringify(data) }),
  getUnreadCount: () => apiFetch('/messages/unread'),
};

// Reviews
export const reviewsAPI = {
  create: (data) => apiFetch('/reviews', { method: 'POST', body: JSON.stringify(data) }),
  getUserReviews: (userId) => apiFetch(`/reviews/user/${userId}`),
};

// AI
export const aiAPI = {
  suggestPrice: (params) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch(`/ai/suggest-price?${query}`);
  },
  getRecommendations: () => apiFetch('/ai/recommendations'),
};
