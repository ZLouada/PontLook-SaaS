import type { Access } from 'payload'

export const isAdmin: Access = ({ req: { user } }) => {
  return Boolean(user && (user as { role?: string }).role === 'admin')
}

export const isEditorOrAdmin: Access = ({ req: { user } }) => {
  if (!user) return false
  const role = (user as { role?: string }).role
  return role === 'admin' || role === 'editor'
}

export const isPublishedOrAuthenticated: Access = ({ req: { user } }) => {
  if (user) return true

  return {
    status: {
      equals: 'published',
    },
  }
}
