

import * as actions from "../Actions/types";

export function getInitialState() {
	return {
		//to know the initial state of the each component
		
        themeFlag: false,
		scientificFlag: false,
		listUser:[],
		userDetail:{},
		userFlag:false
		
	};
}

export const CalculatorReducer = function (state = getInitialState(), action) {
	const actionHandlers = {

		[actions.TOGGLE_THEME]() {
			let newState = state;
			return Object.assign({}, newState, { themeFlag: !action.themeFlag });
		},
		[actions.TOGGLE_USER]() {
			let newState = state;
			return Object.assign({}, newState, { userFlag: action.flag });
        },
        [actions.TOGGLE_SCIENTIFIC_FLAG]() {
			let newState = state;
			return Object.assign({}, newState, { scientificFlag: !action.scientificFlag });
		},
		[actions.SET_USER_LIST]() {
			let newState = state;
			return Object.assign({}, newState, { listUser: action.result });
		},
		[actions.SET_USER_DETAIL]() {
			let newState = state;
			return Object.assign({}, newState, { userDetail: action.result });
		},
		[actions.DELETE_USER]() {
			let newState = state;
			let list = newState.listUser;
			let id = action.id
			list = list.filter(function( obj ) {
				return obj.id !== id;
			  });
			return Object.assign({}, newState, { listUser: list });
		},

	};

	if (action.type in actionHandlers) {
		return actionHandlers[action.type]();
	}
	return state;
};
