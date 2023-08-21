/* eslint-disable max-len */
import { describe, test, vi } from 'vitest';
import { render } from '@testing-library/react';
import FormInput from '../../pages/Registration/components/formInput';
import { Inputs } from '../../data/data';

describe('Testing <FormInput/>', () => {
    test('<FormInput /> render with className', () => {
        const input = Inputs[0];
        const onChangeInput = vi.fn();
        const value = {
            firstname: '',
            lastname: '',
            birthday: '',
            email: '',
            password: '',
            confirmPassword: '',
            country: '',
            street: '',
            city: '',
            postalCode: '',
        };
        const validInputs = {
            firstname: true,
            lastname: true,
            birthday: true,
            email: true,
            password: true,
            confirmPassword: true,
            street: true,
            city: true,
            country: true,
            postalCode: true,
        };
        const screen = render(
            <FormInput
                values={value}
                setValues={onChangeInput}
                validInputs={validInputs}
                setValidInputs={onChangeInput}
                input={input}
            />
        );
        screen.container.getElementsByClassName('firstname-input');
    });
});
