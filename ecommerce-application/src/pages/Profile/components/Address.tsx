/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import CreateIconButton from '../../../components/ui/IconButton';
import Image from '../../../components/ui/Image';
import Card from '../../../assets/img/card.svg';
import Truck from '../../../assets/img/truck.svg';
import '../styles/Address.css';
import { CodeCountry } from '../../../data/enums';
import { IAddress } from '../../../data/interfaces';

export interface IAddressComponent {
    address: IAddress;
    shipping: boolean;
    billing: boolean;
    onDelete: (id: string) => void;
    onUpdate: (id: string, address: IAddress, shipping: boolean, billing: boolean) => void;
}
function Address(props: IAddressComponent) {
    const { address, shipping, billing, onDelete, onUpdate } = props;
    const defineCountry = (code: string) => {
        if (code === 'DE' || code === 'PT') {
            return CodeCountry[code];
        }
        return code;
    };
    const handleDelete = () => {
        const { id } = address;
        if (id) {
            onDelete(id);
        }
    };
    const handleUpdate = () => {
        const { id } = address;
        if (id) {
            onUpdate(id, address, shipping, billing);
        }
    };
    return (
        <div className="address-item">
            <div className="address-item__text">
                <p className="address-item__text-main">{`${defineCountry(address.country)}, ${address.city}`}</p>
                <p className="address-item__text-add">{`${address.streetName}, ${address.postalCode}`} </p>
            </div>
            <div className="addres-item__icons">
                <div className="shipping-billing-address">
                    {shipping ? (
                        <div className="flex items-center gap-2">
                            <p className="address-item__text-add address-helper-text">Shipping</p>
                            <Image className="addres-item__icon" image={Card} alt="billing address" />
                        </div>
                    ) : null}
                    {billing ? (
                        <div className="flex items-center gap-2">
                            <p className="address-item__text-add address-helper-text">Billing</p>
                            <Image className="addres-item__icon" image={Truck} alt="shipping address" />
                        </div>
                    ) : null}
                </div>
                <div className="default-address">
                    {address.defaultShippingAddress ? <p className="address-item__default">default Shipping</p> : null}
                    {address.defaultBillingAddress ? <p className="address-item__default">default Billing</p> : null}
                </div>
            </div>

            <div className="address-item__btns">
                <div onClick={handleUpdate}>
                    <CreateIconButton type="pen" size="medium" />
                </div>
                <div onClick={handleDelete}>
                    <CreateIconButton type="delete" size="medium" />
                </div>
            </div>
        </div>
    );
}

export default Address;
