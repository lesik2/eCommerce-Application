/* eslint-disable max-len */
import { describe, test, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import userEvent from '@testing-library/user-event';
import FormInput from '../../pages/Registration/components/formInput';
import { Inputs } from '../../data/data';

describe('Testing <FormInput/>', () => {
    const input = Inputs[0];
    const values = {
        firstname: '',
        lastname: '',
        birthday: '',
        email: '',
        password: '',
        confirmPassword: '',
        ShippingCountry: '',
        ShippingStreet: '',
        ShippingCity: '',
        ShippingPostalCode: '',
        BillingCountry: '',
        BillingStreet: '',
        BillingCity: '',
        BillingPostalCode: '',
    };
    const onChangeInputValue = vi.fn();
    const onChangeInputValidation = vi.fn();
    const validInputs = {
        firstname: true,
        lastname: true,
        birthday: true,
        email: true,
        password: true,
        confirmPassword: true,
        ShippingCountry: true,
        ShippingStreet: true,
        ShippingCity: true,
        ShippingPostalCode: true,
        BillingCountry: true,
        BillingStreet: true,
        BillingCity: true,
        BillingPostalCode: true,
    };
    let inputForm: HTMLInputElement;
    beforeEach(() => {
        render(
            <FormInput
                values={values}
                setValues={onChangeInputValue}
                validInputs={validInputs}
                setValidInputs={onChangeInputValidation}
                input={input}
            />
        );
        inputForm = screen.getByRole('textbox', { name: 'Firstname' });
    });
    afterEach(() => {
        vi.clearAllMocks();
    });
    test('<FormInput /> render input tag with name and empty value', () => {
        expect(inputForm).toHaveValue('');
    });
    test('<FormInput /> render input tag with id', () => {
        expect(inputForm.id).toBe('1');
    });
    test('user change data - setState is called ', async () => {
        await userEvent.type(inputForm, 'A');
        expect(onChangeInputValue).toHaveBeenCalledTimes(1);
    });
    test('user change data - called onChange callback', async () => {
        await userEvent.type(inputForm, 'Am');
        expect(onChangeInputValue).toHaveBeenCalledWith({
            firstname: 'A',
            lastname: '',
            birthday: '',
            email: '',
            password: '',
            confirmPassword: '',
            ShippingCountry: '',
            ShippingStreet: '',
            ShippingCity: '',
            ShippingPostalCode: '',
            BillingCountry: '',
            BillingStreet: '',
            BillingCity: '',
            BillingPostalCode: '',
        });
    });
});
