import { func } from "prop-types";
import db from "../../db.json";

export default function (request, response) {
  response.json(db);
}
