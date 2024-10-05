export const supabase = {
  auth: {
    signInWithPassword: jest.fn(() => ({
      data: { user: { id: 1, email: 'test@example.com' } },
      error: null,
    })),
    getUser: jest.fn(() => ({
      data: { user: { id: 1, email: 'test@example.com' } },
      error: null,
    })),
  },
}
