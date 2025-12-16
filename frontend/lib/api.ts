import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Intercepteur pour ajouter le token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Services API
export const contactAPI = {
  sendMessage: (data: { name: string; email: string; message: string }) =>
    api.post('/contact', data),
}

export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  register: (userData: { name: string; email: string; password: string; phone?: string; company?: string }) =>
    api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (userData: { name: string; phone?: string; company?: string }) =>
    api.put('/auth/profile', userData),
  changePassword: (passwords: { currentPassword: string; newPassword: string }) =>
    api.put('/auth/change-password', passwords),
}

export const projectsAPI = {
  getAll: () => api.get('/projects'),
  getById: (id: string) => api.get(`/projects/${id}`),
  getBySubcategory: (subcategory: string) => api.get(`/projects/subcategory/${encodeURIComponent(subcategory)}`),
  create: (projectData: any) => api.post('/projects', projectData),
  update: (id: string, projectData: any) => api.put(`/projects/${id}`, projectData),
  delete: (id: string) => api.delete(`/projects/${id}`),
  toggleFeatured: (id: string) => api.put(`/projects/${id}/toggle-featured`),
  updateStatus: (id: string, status: string) => api.put(`/projects/${id}/status`, { status }),
}

export const uploadAPI = {
  single: (file: File) => {
    const formData = new FormData()
    formData.append('image', file)
    return api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  multiple: (files: File[]) => {
    const formData = new FormData()
    files.forEach(file => formData.append('images', file))
    return api.post('/upload/multiple', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
}

export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  getUsers: (params?: any) => api.get('/admin/users', { params }),
  createAdmin: (userData: any) => api.post('/admin/create-admin', userData),
}

export const categoriesAPI = {
  getAll: () => api.get('/categories'),
  getSubcategories: (category: string) => api.get(`/categories/${category}/subcategories`),
}

export default api