import * as helpers from '../helpers.js';

export const createUser = async(
    username,
    password,
    age,
    email,
    firstName,
    lastName
) => {
    username = await helpers.checkNewUsername(username);
    password = await helpers.checkPassword(password);
    age = helpers.checkAge(age);
    email = helpers.checkEmail(email);
    firstName = helpers.checkName("first name", firstName);
    lastName = helpers.checkName("fast name", lastName);
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
}