import { AddressUtil } from '../util/address.util';

export class Donation {

    organizationId: number;
    ownerAddress: string;
    senderAddress: string;
    value: string;
    string: string;

    ownerAddressTruncated(): string {

        return AddressUtil.truncateAddress(this.ownerAddress);
    }

    senderAddressTruncated(): string {

        return AddressUtil.truncateAddress(this.senderAddress);
    }

    getString() {
        this.setString();
        return this.string;
    }

    setString() {
        this.string = 'Donation[organizationID=' + this.organizationId + ''
            + ', ownerAddress=' + this.ownerAddress + ''
            + ', senderAddress=' + this.senderAddress + ''
            + ', value=' + this.value + ']';
    }
}
