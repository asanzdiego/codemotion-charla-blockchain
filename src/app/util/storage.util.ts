export class StorageUtil {

  private static _userAddress = 'userAddress';

  static getUserAddress() {
    return this._getFromLocalStorage(this._userAddress);
  }

  static setUserAddress(userAddress: string) {
    this._setToLocalStorage(this._userAddress, userAddress);
  }


  private static _getFromLocalStorage(collectionName: string) {
    const data = localStorage.getItem(collectionName);
    if (data) {
      return JSON.parse(data);
    }
    return {};
  }

  private static _setToLocalStorage(collectionName: string, data: any) {
    localStorage.setItem(collectionName, JSON.stringify(data));
  }
}
