import { combineReducers } from "redux";

import admin from "./admin";
import auth from "./auth";
import purchase from "./purchase";

export default combineReducers({ admin, auth, purchase });
