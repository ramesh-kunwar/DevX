import { CONFIG } from "./config/index";

function greet(name: string) {
    console.log(`Welcome ${name}`);
}

console.log(CONFIG.PORT);
greet("Ramesh!");
