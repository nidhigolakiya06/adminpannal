import { addMedicineData, deleteMedicine, getMedicineData, updateMedicine } from "../../Comman/API/medicine.api";
import { BASE_URL } from "../../Shared/Base_URL"
import * as ActionType from "../ActionType"

export const medicineGET = () => (dispatch) => {

  try {

    getMedicineData()
    .then((data) => dispatch({ type: ActionType.GET_MEDICINES, payload: data.data }))
    


    dispatch(loadingMedicine());

    // setTimeout(() => {
    //   fetch(BASE_URL + "medicine")
    //     .then(response => {
    //       if (response.ok) {
    //         return response;
    //       } else {
    //         var error = new Error('Error ' + response.status + ': ' + response.statusText);
    //         error.response = response;
    //         throw error;
    //       }
    //     },
    //       error => {
    //         var errmess = new Error(error.message);
    //         throw errmess;
    //       })

    //     .then(response => response.json())
    //     .then(medicines => dispatch({ type: ActionType.GET_MEDICINES, payload: medicines }))
    //     .catch(error => dispatch(errorMedicine(error.message)));
    // }, 2000);

  } catch (error) {
    dispatch(errorMedicine(error.message));

  }
}

export const addMedicine = (Data) => (dispatch) => {
  try {
    dispatch(loadingMedicine());

    setTimeout(() => {

      addMedicineData(Data)
      .then((data) => dispatch({ type: ActionType.POST_MEDICINES, payload: data.data }))


      // fetch(BASE_URL + "medicine", {
      //   method: 'POST', // or 'PUT'
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(Data),
      // })
      //   .then(response => {
      //     if (response.ok) {
      //       return response;
      //     } else {
      //       var error = new Error('Error ' + response.status + ': ' + response.statusText);
      //       error.response = response;
      //       throw error;
      //     }
      //   },
      //     error => {
      //       var errmess = new Error(error.message);
      //       throw errmess;
      //     })

      //   .then(response => response.json())
      //   .then(medicines => dispatch({ type: ActionType.POST_MEDICINES, payload: medicines }))
      //   .catch(error => dispatch(errorMedicine(error.message)));
    }, 2000);
  } catch (error) {
    dispatch(errorMedicine(error.message));

  }
}


export const deletMedicines = (id) => (dispatch) => {

  console.log(id)
  try {

    deleteMedicine(id)
    .then(dispatch({ type: ActionType.DELETE_MEDICINES, payload: id }))

  //  return fetch(BASE_URL + "medicine/" + id, {method: 'delete'})
  //     .then(response => {
  //       if (response.ok) {
  //         return response;
  //       } else {
  //         var error = new Error('Error ' + response.status + ': ' + response.statusText);
  //         error.response = response;
  //         throw error;
  //       }
  //     },
  //       error => {
  //         var errmess = new Error(error.message);
  //         throw errmess;
  //       })

  //     .then(response => response.json())
  //     .then(dispatch({ type: ActionType.DELETE_MEDICINES, payload: id }))
  //     .catch(error => dispatch(errorMedicine(error.message)));
  } catch (error) {
    dispatch(errorMedicine(error.message));
  }
}

export const updataMedicine = (UpadateData) => (dispatch) => {
  try{

    updateMedicine(UpadateData)
    .then((data) => dispatch({ type: ActionType.UPADATE_MEDICINES, payload: data.data}))

    // fetch(BASE_URL + "medicine/" + UpadateData.id, {
    //   method: 'PUT', // or 'POST'
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(UpadateData),
    // })
    //   .then(response => {
    //     if (response.ok) {
    //       return response;

    //     } else {
    //       var error = new Error('Error ' + response.status + ': ' + response.statusText);
    //       error.response = response;
    //       throw error;
    //     }
    //   },
    //     error => {
    //       var errmess = new Error(error.message);
    //       throw errmess;
    //     })

    //   .then(response => response.json())
    //   .then(dispatch({ type: ActionType.UPADATE_MEDICINES, payload:  UpadateData}))
    //   .catch(error => dispatch(errorMedicine(error.message)));
  }catch (error) {
    dispatch(errorMedicine(error.message));
  }
}

export const loadingMedicine = () => (dispatch) => {
  dispatch({ type: ActionType.LOADING_MEDICINES })
}

export const errorMedicine = (error) => (dispatch) => {
  dispatch({ type: ActionType.ERROR_MEDICINES, payload: error })

}