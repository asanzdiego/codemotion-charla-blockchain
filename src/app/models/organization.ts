import { AddressUtil } from '../util/address.util';

export class Organization {

    id: number;
    ownerAddress: string;
    name: string;
    string: string;

    ownerAddressTruncated(): string {

        return AddressUtil.truncateAddress(this.ownerAddress);
    }

    getString() {
        this.setString();
        return this.string;
    }

    setString() {
        this.string = 'Organization[ID=' + this.id + ''
            + ', ownerAddress=' + this.ownerAddress + ''
            + ', name=' + this.name + ']';
    }
}
