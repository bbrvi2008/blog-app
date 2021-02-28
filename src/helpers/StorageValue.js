import { IsJsonString } from './Utils';

export default class StorageValue {
  constructor(valueName) {
    this.valueName = valueName;
  }

  getValue(checkActual = () => true) {
    const value = localStorage.getItem(this.valueName);
    if(!IsJsonString(value)) return null;

    const json = JSON.parse(value);
    
    const isActual = checkActual(json);
    return isActual ? json : null;
  }

  setValue(value) {
    localStorage.setItem(this.valueName, JSON.stringify(value));
  }

  removeValue() {
    localStorage.removeItem(this.valueName);
  }
}