import { mount, flushPromises } from '@vue/test-utils';
import { nextTick } from 'vue';
import Login from '@/pages/login.vue';

import router from '@/router/routes';
import axios from 'axios';

jest.mock('axios');

jest.mock('vue-router', () => ({
    useRouter: () => ({
        push: jest.fn(),
    }),
}));

describe('Login', () => {
    it('renders the login form', () => {
        const wrapper = mount(Login);
        expect(wrapper.find('form').exists()).toBe(true);
    });

    it('updates email and password on user input', async () => {
        const wrapper = mount(Login);
        const emailInput = wrapper.find('input[type="text"]');
        const passwordInput = wrapper.find('input[type="password"]');

        await emailInput.setValue('test@example.com');
        await passwordInput.setValue('password');

        expect(wrapper.vm.email).toBe('test@example.com');
        expect(wrapper.vm.password).toBe('password');
    });

    it('displays an error message when login fails', async () => {
        // Mock the login function to reject with an error
        login.mockRejectedValueOnce({
            request: { status: 401 }
        });

        const wrapper = mount(MyComponent);
        const emailInput = wrapper.find('input[type="text"]');
        const passwordInput = wrapper.find('input[type="password"]');

        await emailInput.setValue('test@example.com');
        await passwordInput.setValue('incorrectpassword');

        await wrapper.find('form').trigger('submit.prevent');
        await flushPromises();

        expect(wrapper.vm.message).toBe('Incorrect password. Please try again');
        expect(wrapper.find('.message').text()).toContain('Incorrect password. Please try again');
    });

    it('navigates to notifications page on successful login', async () => {
        // Mock the login function to resolve with a successful status
        axios.post.mockResolvedValueOnce({
            status: 200,
            data: { user: 'Test User' }
        });

        const wrapper = mount(MyComponent);
        const emailInput = wrapper.find('input[type="text"]');
        const passwordInput = wrapper.find('input[type="password"]');

        await emailInput.setValue('test@example.com');
        await passwordInput.setValue('correctpassword');

        await wrapper.find('form').trigger('submit.prevent');
        await flushPromises();

        expect(router.push).toHaveBeenCalledWith({ path: '/notifications' });
    });

});

