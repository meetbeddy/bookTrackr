import { combineReducers } from "redux";

import admin from "./admin";
import auth from "./auth";
import profiles from "./profiles";

export default combineReducers({ admin, auth, profiles });
