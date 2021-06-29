import { UserRepository } from "./ds/api/user_repository"
import { User } from "./ds/entity/user"
import { MyOrmUserRepository } from "./ds/sources/sqlite/my_orm/my_orm_user_repository"
import { SqliteOrmUserRepository } from "./ds/sources/sqlite/typeorm/sqlite_typeorm_user_repository"
import bcrypt from "bcrypt"

console.log(
	"================================== It works ====================================="
)

async function f() {
	let user: User = new User()
	let repo: UserRepository = new MyOrmUserRepository()

	user = new User()

	user.role = "GUEST"

	user.username = "Jennifer"
	user.password = "1234"

	user.firstName = "Jennifer"
	user.middleName = ""
	user.lastName = "Smith"

	user.email = "jennifer.s@gmail.com"
	user.phoneNumber = "(091)121 5577"
	user.fax = ""

	user.address = "Main Street 15"
	user.city = "Cluj-Napoca"

	user.zipCode = "750049"

	user.state = "Romania"

	user.country = "Romania"

	user.hashPassword()
	user = await repo.insert(user)

	console.log(bcrypt.compareSync("1234", user.password))
	console.log(await repo.findAll())

	// console.log(bcrypt.compareSync("1234", user.password))
	// console.log(await repo.findAll())
}

f()
