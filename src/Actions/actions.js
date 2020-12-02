
import * as types from "./types";

export function toggleTheme(themeFlag) {
	return function (dispatch) {
		dispatch({ type: types.TOGGLE_THEME, themeFlag });
	};
}

export function toggleScientific(scientificFlag) {
	return function (dispatch) {
		dispatch({ type: types.TOGGLE_SCIENTIFIC_FLAG  , scientificFlag });
	};
}

//
export function getUsersShow(flag) {
	return function (dispatch) {
		dispatch({ type: types.TOGGLE_USER, flag });
	};
}



  export function deleteUser(id){
	return function (dispatch) {

		dispatch({ type: types.DELETE_USER, id });
	};
  }

function createData(id,name,phone,username,website,email,company,address,city,zipcode) {
	return { id,name,phone,username,website,email,company,address,city,zipcode };
  }
export function getUsers(){
	return function (dispatch) {
		fetch(`https://jsonplaceholder.typicode.com/users`)
		.then(res => res.json())
		.then(
		  (res) => {
			
	
			  let result = [];
			  for (let index = 0; index < res.length; index++) {
				  const element = res[index];
				  const address = "Street:" +element.address.street + "Suite:"+element.address.suite 
result.push(createData(element.id,element.name,element.phone,element.username,element.website,element.email,element.company.name,address,element.address.city,element.address.zipcode))
				  
			  }
			dispatch({ type: types.SET_USER_LIST, result });
		  },
		  
		  (error) => {
			
		  }
		)
	
	};
}

export function getUserById(id){
	return function (dispatch) {
		fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
		.then(res => res.json())
		.then(
		  (result) => {
			
	
			 
			dispatch({ type: types.SET_USER_DETAIL, result });
		  },
		  
		  (error) => {
			
		  }
		)
	
	};
}

