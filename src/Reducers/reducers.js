

import * as actions from "../Actions/types";

export function getInitialState() {
	return {
		//to know the initial state of the each component
		
        themeFlag: false,
        scientificFlag: false
		
	};
}

export const CalculatorReducer = function (state = getInitialState(), action) {
	const actionHandlers = {

		[actions.TOGGLE_THEME]() {
			let newState = state;
			return Object.assign({}, newState, { themeFlag: !action.themeFlag });
        },
        [actions.TOGGLE_SCIENTIFIC_FLAG]() {
			let newState = state;
			return Object.assign({}, newState, { scientificFlag: !action.scientificFlag });
		},

	};

	if (action.type in actionHandlers) {
		return actionHandlers[action.type]();
	}
	return state;
};
