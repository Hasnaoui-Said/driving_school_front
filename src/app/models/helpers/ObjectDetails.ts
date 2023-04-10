export class ObjectDetails {
    id?: string;
    name?: string;
  
    constructor(objectDetails: ObjectDetails) {
        this.id = objectDetails.id;
        this.name = objectDetails.name;
    }
}