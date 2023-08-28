import CreateIconButton from '../../../components/ui/IconButton';
import Image from '../../../components/ui/Image';
import { IAddressComponent } from '../../../data/interfaces';
import Card from '../../../assets/img/card.svg';
import Truck from '../../../assets/img/truck.svg';
import './Address.css';
import { CodeCountry } from '../../../data/enums';

function Address(props: IAddressComponent) {
    const { address, shipping, billing } = props;
    const defineCountry = (code: string) => {
        if (code === 'DE' || code === 'PT') {
            return CodeCountry[code];
        }
        return code;
    };
    return (
        <div className="address-item">
            <div className="address-item__text">
                <p className="address-item__text-main">{`${defineCountry(address.country)}, ${address.city}`}</p>
                <p className="address-item__text-add">{`${address.streetName}, ${address.postalCode}`} </p>
            </div>
            <div className="addres-item__icons">
                {shipping ? (
                    <div className="flex items-center gap-2">
                        <p className="address-item__text-add">Shipping</p>
                        <Image className="addres-item__icon" image={Card} alt="billing address" />
                    </div>
                ) : null}
                {billing ? (
                    <div className="flex items-center gap-2">
                        <p className="address-item__text-add">Billing</p>
                        <Image className="addres-item__icon" image={Truck} alt="shipping address" />
                    </div>
                ) : null}
                {address.defaultShippingAddress ? <p className="address-item__default">default Shipping</p> : null}
                {address.defaultBillingAddress ? <p className="address-item__default">default Billing</p> : null}
            </div>

            <div className="address-item__btns">
                <CreateIconButton type="pen" size="medium" />
                <CreateIconButton type="delete" size="medium" />
            </div>
        </div>
    );
}

export default Address;
