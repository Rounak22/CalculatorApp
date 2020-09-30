
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