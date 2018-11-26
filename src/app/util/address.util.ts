export class AddressUtil {

    static truncateAddress(address: string): string {
        if (!address) {
            return '';
        }
        let newAddress = address;
        if (address.length > 6) {
            newAddress = address.substring(0, 5) + '...';
        }
        if (address.length > 10) {
            newAddress = newAddress + address.substring(address.length - 5, address.length - 1);
        }
        return newAddress;
    }
}
