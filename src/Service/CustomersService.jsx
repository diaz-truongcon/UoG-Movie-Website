import { updateDocument } from "./FirebaseService";

export const  addUser  = async ( values, imgUpload ) => {

    const { id, gender, phone, name, ...newCustomer } = values;
    if (gender !== undefined) {
        newCustomer.gender = gender;
    }
    if (phone !== undefined) {
        newCustomer.phone = phone;
    }
    if(name !== undefined) {
        newCustomer.name = name;
    }
    await updateDocument('Customers', id, newCustomer, imgUpload);
}