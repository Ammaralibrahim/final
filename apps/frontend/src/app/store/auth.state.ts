export interface AuthState {
    token: string | null;
    error: string | null;
    message: string | null;
  }
  
  
  export const initialAuthState: AuthState = {
    token: null,
    error: null,
    message: null
  };
  