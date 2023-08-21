/* eslint-disable max-len */
import { describe, test, vi, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import userEvent from '@testing-library/user-event';
import React from 'react';
import FormInput from '../../pages/Registration/components/formInput';
import { Inputs, addressInputs } from '../../data/data';
import AddressInputs from '../../pages/Registration/components/addressInputs';

describe('Testing <FormInput/>', () => {
    const input = Inputs[0];
    const values = {
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
    const onChangeInputValue = vi.fn();
    const onChangeInputValidation = vi.fn();
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
            birthday: '',
            city: '',
            confirmPassword: '',
            country: '',
            email: '',
            firstname: 'A',
            lastname: '',
            password: '',
            postalCode: '',
            street: '',
        });
    });
});
describe('Testing <FormInput/>', () => {
    const testId = 'address-list';
    const values = {
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
    const onChangeInputValue = vi.fn();
    let inputsWrapper: HTMLDivElement;
    beforeEach(() => {
        render(<AddressInputs values={values} setValues={onChangeInputValue} nameOFType="Shipping address" />);
        inputsWrapper = screen.getByTestId(testId);
    });
    afterEach(() => {
        vi.clearAllMocks();
    });
    test('Should render the list of inputs', () => {
        expect(inputsWrapper.children.length).toBe(addressInputs.length);
    });
    test('After render of the component inputs are not clicked ', () => {
        expect(inputsWrapper.classList.contains('address-inputs')).toBe(true);
    });
    test('After click on the button state of <FormInput/> is changing', async () => {
        const setState = vi.fn();
        vi.spyOn(React, 'useState').mockImplementationOnce(setState());
        const button: HTMLButtonElement = screen.getByRole('button');
        await userEvent.click(button);
        expect(setState).toHaveBeenCalledTimes(1);
    });
});
