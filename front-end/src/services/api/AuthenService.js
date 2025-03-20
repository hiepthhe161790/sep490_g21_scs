import api from '../index'; // Ensure api is properly configured to handle requests
class AuthenService {
    async register(data) {
        try {
            const response = await api.post('user/register', data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async login(data) {
        try {
            const response = await api.post('user/login', data);
            if (response.data.accessToken) {
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
            }
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async forgotPassword(email) {
        try {
            const response = await api.post('user/forgot-password', { email });
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    }

    async resetPassword(token, password) {
        try {
            const response = await api.post(`user/reset-password/${token}`, { password, token });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async verifyEmail(otp, email) {
        try {
            const response = await api.get('user/verify-email', { params: { otp, email } });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async resendVerificationEmail(email) {
        try {
            const response = await api.get('user/resend-verification-email', { params: { email } });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async updateProfile(data) {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await api.put('user/profile', data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async changePassword(data) {
        try {
            const response = await api.put('user/change-password', data);
            return response.data;
        } catch (error) {
            console.error('Error changing password:', error);
            throw error;
        }
    }

    async getProfile() {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await api.get(`user/profile`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            console.error('Error getting user by ID:', error);
            throw error;
        }
    }
    async logout() {
        try {
            const token = localStorage.getItem('accessToken');
            await api.post('user/logout', {}, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            localStorage.removeItem('accessToken');
        } catch (error) {
            console.error('Error logging out:', error);
            throw error;
        }
    }

    async refreshToken() {
        try {
            const response = await api.post('user/refresh-token', {}, { withCredentials: true });
            if (response.data.accessToken) {
                localStorage.setItem('accessToken', response.data.accessToken);
            }
            return response.data;
        } catch (error) {
            console.error('Error refreshing token:', error);
            throw error;
        }
    }

}

export default new AuthenService();
