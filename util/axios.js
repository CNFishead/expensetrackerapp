import axios from "axios";

/**
 * @description   - Creates an axios instance with the base url of the api if we are in production
 *
 * @possible      - development http://localhost:5000/api/v1
 * @possible      - production  https://api.truthcasting.com/api/v1
 */
export default axios.create({
  baseURL: "https://react-native-course-920fd-default-rtdb.firebaseio.com",
  headers: {
    "Content-type": "application/json",
  },
});
