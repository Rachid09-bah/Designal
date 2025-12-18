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
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  config.withCredentials = true
  return config
})

// Intercepteur pour corriger les URLs dans les réponses
api.interceptors.response.use((response) => {
  if (response.data) {
    // Corriger récursivement toutes les URLs localhost
    response.data = fixUrlsInObject(response.data)
  }
  return response
})

function fixUrlsInObject(obj: any): any {
  if (!obj) return obj
  
  if (typeof obj === 'string' && obj.includes('localhost:5001')) {
    return obj.replace('http://localhost:5001', 'https://designal-bah.onrender.com')
  }
  
  if (Array.isArray(obj)) {
    return obj.map(fixUrlsInObject)
  }
  
  if (typeof obj === 'object') {
    const fixed: any = {}
    for (const [key, value] of Object.entries(obj)) {
      fixed[key] = fixUrlsInObject(value)
    }
    return fixed
  }
  
  return obj
}

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
    return api.post('/upload/single', formData, {
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