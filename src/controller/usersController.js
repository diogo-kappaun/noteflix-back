import { AppError } from "../utils/AppError.js";
export class usersController {
  create(request, response) {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      throw new AppError("All fields are required!");
    }
    
    return response.json({ name, email, password });
  }
}
