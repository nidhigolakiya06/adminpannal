import { deleteRequest, getRequest, postRequest, putRequest } from "../Request"

export const getMedicineData = () => {
    return getRequest("medicine")
}

export const addMedicineData = (Data) => {
    return postRequest("medicine",Data)
}

export const deleteMedicine = (id) => {
    return deleteRequest("medicine/" + id)
}

export const updateMedicine = (data) => {
    return putRequest("medicine/", data )
}