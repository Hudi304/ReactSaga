import Hapi from "hapi"
import * as jwt from "jsonwebtoken"
import { UserRepository } from "../../ds/api/user_repository"
import bcrypt from "bcrypt"
import { User } from "../../ds/entity/user"
//! de hadeluit si request param optional SIZE

export const loginHandler = (repository: UserRepository) => {
	return async function (request: Hapi.Request, headers: any) {
		const payload: any = request.payload
		const { username, password } = payload
		if (!(username && password)) {
			return headers.response().code(400).message("No username or password!")
		}

		const result: User = await repository.getByUsername(username)
		if (!result) {
			return headers.response().code(401).message("Incorrect username!")
		}

		if (!bcrypt.compareSync(password, result.password)) {
			return headers.response().code(401).message("Incorrect password!")
		}

		console.log(result)
		const token = jwt.sign(
			{ userId: result.id, username: result.username },
			"@QEGTUI",
			{ expiresIn: "1h" }
		)
		const response = {
			token : token,
			userDetails : result
		}

		return headers.response(response)
        .code(200)
        .message("Logged in")
	}
}

export const saveChangesHandler = (repository: UserRepository) => {
	return async function (request: Hapi.Request, headers: any) {
		const payload: any = request.payload
		console.log("paylaod", payload)

		let userDB :User = await repository.getByUsername(payload.username)

		let user: User = new User()

		user.username = payload.username
		user.password = payload.password

		user.firstName = payload.firstName
		user.middleName = payload.middleName
		user.lastName = payload.lastName

		user.email = payload.email
		user.phoneNumber = payload.phoneNumber
		user.fax = payload.fax

		user.address = payload.address
		user.city = payload.city
		user.state = payload.state

		user.zipCode = payload.zipCode
		user.country = payload.country

		// console.log("userDB", userDB)
		// console.log("user", user)

		repository.delete(userDB)
		repository.insert(user)

		return headers.response("recieved")
        .code(200)
        .message("Logged in")
	}
}



// export const updateAccountHandler = (repository: UserRepository) => {
//     return async function (request: Hapi.Request, headers: any) {
//       const payload: any = request.payload;
//       const {
//         token = "",
//         username,
//         firstName,
//         lastName,
//         middleName,
//         email,
//         phoneNumber,
//         fax,
//         address,
//         zipCode,
//         city,
//         state,
//         country,
//       } = payload;
  
//       try {
//         const decoded: any = jwt.verify(token, "@QEGTUI");
//         if (decoded.username !== username) {
//           return headers.response().code(401).message("Invalid token!");
//         }
//       } catch (err) {
//         console.log(err);
//         return headers.response().code(401).message("Invalid token!");
//       }
  
//       const result = await repository.getByUsername(username);
//       if (!result) {
//         return headers.response().code(404).message("User not found!");
//       }
//       firstName != "" && (result.firstName = firstName);
//       lastName != "" && (result.lastName = lastName);
//       middleName != "" && (result.middleName = middleName);
//       email != "" && (result.email = email);
//       phoneNumber != "" && (result.phoneNumber = phoneNumber);
//       fax != "" && (result.fax = fax);
//       address != "" && (result.address = address);
//       zipCode != "" && (result.zipCode = zipCode);
//       city != "" && (result.city = city);
//       state != "" && (result.state = state);
//       country != "" && (result.country = country);
  
//       await repository.update(result);
  
//       return headers
//         .response({ details: result })
//         .code(200)
//         .message("Updated successfully!");
//     };
//   };