import * as helpers from "./helpers.js"

try {
    console.log(helpers.checkName("Name"));
} catch(e) {
    console.log(e);
}

try {
    console.log(helpers.checkName("Name", 1));
} catch(e) {
    console.log(e);
}

try {
    console.log(helpers.checkName("Name", ""));
} catch(e) {
    console.log(e);
}

try {
    console.log(helpers.checkName("Name", " "));
} catch(e) {
    console.log(e);
}

try {
    console.log(helpers.checkName("a"));
} catch(e) {
    console.log(e);
}

try {
    console.log(helpers.checkName("abcdefghijklmnopqrstuvwxyz"));
} catch(e) {
    console.log(e);
}

try {
    console.log(helpers.checkName("Eric"));
} catch(e) {
    console.log(e);
}