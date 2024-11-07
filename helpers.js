import {users} from './config/mongoCollections.js';

function checkString(name, str) {
    // Check if the input is a string
    if (typeof str !== 'string') throw name  + " must be a string.";

    // Trim the string and check if it’s empty
    str = str.trim();
    if (str.length === 0) throw name + " cannot be empty.";

    // Return the trimmed string if valid
    return str;
}

function checkUsername(username) {
// Check if username is a valid, non-empty string
    username = checkString("Username", username);

    // Check the length constraints
    if (username.length < 8) throw "Username must be at least 8 characters long.";
    if (username.length > 25) throw "Username must be 25 characters or fewer.";

    // Check for valid characters (letters, numbers, and specific special characters)
    const validPattern = /^[a-zA-Z0-9!@#$%^&*]+$/;
    if (!validPattern.test(username)) throw "Username can only contain letters, numbers, and !@#$%^&*.";

    // If all checks pass, return the valid username
    return username;
}


const checkNewUsername = async(username) => {
// First, check if the username is valid
    checkUsername(username);

    // Convert the username to lowercase for case-insensitive search
    const lowerUsername = username.toLowerCase();

    // Query MongoDB to see if the username already exists (case-insensitive)
    const userCollection = await users();
    const existingUser = await userCollection.findOne({
        username: { $regex: new RegExp(`^${lowerUsername}$`, "i") }
    });

    // If the username is found in the database, throw an error
    if (existingUser) throw "This username is already taken.";

    // If no errors are thrown, return the valid username
    return username;
}

function checkPassword(password) {
    // Step 1: Check if the password is a valid string using checkUsername function
    checkString("Password", password);
  
    // Step 2: Ensure the password is greater than 7 characters
    if (password.length < 8) throw "Password must be at least 8 characters long.";
  
    // Step 3: Ensure the password is less than 26 characters
    if (password.length > 25) throw "Password must be no more than 25 characters long.";
  
    // Step 4: Ensure the password contains only allowed characters (letters, numbers, and special characters)
    const validCharacters = /^[A-Za-z0-9!@#$%^&*,]+$/;
    if (!validCharacters.test(password)) throw "Password can only contain letters, numbers, and the following special characters: !@#$%^&*.";
  
    // Step 5: Ensure the password contains at least one uppercase letter, one lowercase letter, one number, and one special character
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*,]/.test(password);
  
    if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecial) throw "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.";
  
    // Step 6: Return the password if all checks pass
    return password;
}

function checkNumber(name, number) {
    // Step 1: Check if the number is provided
    if (number === undefined || number === null) throw name + " is required.";
  
    // Step 2: Check if the number is actually a number
    if (typeof number !== 'number' || isNaN(number)) throw name + " must be a valid number.";
  
    // Step 3: Return the number if all checks pass
    return number;
}

function checkAge(age) {
    // Step 1: Use the checkNumber function to validate if the age is a valid number
    checkNumber("Age", age);
  
    // Step 2: Ensure the age is an integer
    if (!Number.isInteger(age)) throw "Age must be an integer.";
  
    // Step 3: Ensure the age is greater than 0 and less than 100
    if (age <= 0 || age >= 100) throw "Age must be between 1 and 99.";
  
    // Step 4: Ensure the age is 18 or greater
    if (age < 18) throw "You are not old enough to access this website.";
  
    // Step 5: Return the age if all checks pass
    return age;
}

function checkEmail(email) {
    // Step 1: Use checkString function to ensure the email is a valid string
    email = checkString("Email", email);
  
    // Step 2: Validate the email format using a regular expression
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) throw "Email must be a valid email address.";
  
    // Step 3: Return the email if all checks pass
    return email;
}

const checkNewEmail = async(email) => {
    email = checkEmail(email);
    const userCollection = await users();
    const oldEmail = await userCollection.findOne({email: email});
    if (oldEmail) throw "This email has already been used."
    return email;
}

function checkName(nameVal, name) {
    name = checkString(nameVal, name);
    if (name.length < 2) throw "The " + nameVal + " must be at least 2 characters long.";
    if (name.length > 25) throw "The " + nameVal + " must be at least 25 characters long.";
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (let i in name) {
        if (!chars.includes(name[i])) throw "The " + nameVal + " is invalid.";
    }
    name = name[0].toUpperCase() + name.slice(1);
}

export { checkString, checkUsername, checkNewUsername, checkPassword, checkNumber, checkAge, checkEmail, checkNewEmail, checkName };