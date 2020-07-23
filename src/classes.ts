// Normally JS has prototype based inheritance
// But for many developers it may seem uncomprehensible
// So using syntactic sugar is a good way
// Basic class example
class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new Greeter("world");
// Inheritance is a key concept in classes
// Just remember you can inherit only from ONE class
// To access parent class' members use super keyword
// In constructor use super() to call parent constructor
// But remember super always in the first line of constructor
// To access members use super.member syntax
// You can also override methods by defining them in child class
// Now let's make an example

// Just to fix "Property 'name' does not exist on type 'Function'" error
interface Function {
    name: string
}

const generateId = (): string => {
    let id = ''
    for (let i = 0; i < 8; ++i) {
        const randomValue = Math.floor(Math.random() * 2)
        if (randomValue === 0) {
            id = id + String.fromCharCode('a'.charCodeAt(0) + Math.floor(Math.random() * (26)))
        } else {
            id = id + String.fromCharCode('0'.charCodeAt(0) + Math.floor(Math.random() * 10))
        }
    }
    return id
}

class NativeTerminal {
    id: string

    constructor() {
        this.id = generateId()
    }

    run(): void {
        console.log('\x1b[35m%s\x1b[0m', this.toString())
        console.log('\x1b[32m%s\x1b[0m', 'Script is has been loaded.')
    }

    toString(): string {
        return `@${this.constructor.name}[${this.id}]`
    }
}


class WindowsTerminal extends NativeTerminal {
    script: string
    version: string

    constructor(script: string, version: string) {
        super()
        this.version = version
        this.script = script
    }

    run(): void {
        super.run()
        console.log('\x1b[37m\x1b[44m%s\x1b[0m', this.script)
        console.log('\x1b[32m%s\x1b[0m', 'Script executed.')
    }

    toString(): string {
        return `@${this.constructor.name}v${this.version}[${this.id}]`
    }
}
// When a class is a child for another class we can use
// parent as type
const CMD: NativeTerminal = new WindowsTerminal('echo "Hello World!" > out.txt', '1.5')
CMD.run()
// Visibility modifiers
// public, private and protected
// When a class member is public
// We can reach it from whereever we want
// All members are public by default
// A private member is only accessible within the class
// With the version 3.8 of TS
// it now supports new JS syntax for private fields (syntax: #member)
// If you want to use them change target to es2015
// But for normal case we will use private identifier
class PrivateClass {
    private privateField: string

    constructor(privateField: string) {
        this.privateField = privateField
    }

    print(): void {
        console.log('\x1b[33m%s\x1b[0m', `Private value: "${this.privateField}"`)
    }
}

const privateClass = new PrivateClass('Secret')
privateClass.print()
// privateClass.privateField // Oops!
// protected is only visible for children of a class
class Parent {
    protected inheritedValue: number

    constructor() {
        this.inheritedValue = Math.floor(Math.random() * 100)
    }
}

class Child extends Parent {

    print(): void {
        console.log('\x1b[37m\x1b[45m%s\x1b[0m', `Inherited value: ${child.inheritedValue}`)
    }
}

const child: Child = new Child()
child.print()
// We can make a constructor protected
// Which makes the class cannot be instantiated
// But it is still expendable
// Hint: Very similar to abstract class that we will see later
class ExpandableClass {
    secretKey: string

    protected constructor() {
        this.secretKey = 'I cannot be instantiated.'
    }
}

class ARandomClass extends ExpandableClass {
    constructor() {
        super()
        console.log('\x1b[37m\x1b[41m%s\x1b[0m', `The secret is "${this.secretKey}"`)
    }
}

const aRandomObject = new ARandomClass()
// readonly modifier: Like we said earlier
// If a property is readonly it can only be
// assigned during creation (in our case constructor)
class StubbornClass {
    // Classic way of defining readonly variables
    // readonly isChangable: boolean

    // Parameter property for readonly
    // That also works for public, private and protected
    // Look how concise is the code now
    constructor(readonly isChangable: boolean = false) {
        // A quirky way of controlling input variable
        this.isChangable = isChangable ? !isChangable : isChangable
    }
}

const stubbornObject = new StubbornClass()
// stubbornObject.isChangable = true // Compile time error
// Accessors (or getters and setters)
// To organise the flow of data in our class
// Or to obtain private and protected data
// We use accessors
// A short example
// Note: Never use setters for private members of a class
// Since it messes all the logic behind the private keyword
// Below is just for an example
class Person {
    private _name: string

    constructor(name: string) {
        this._name = name
    }

    get name(): string {
        return this._name
    }

    set name(newName: string) {
        this._name = newName
    }
}

const person = new Person('Henry')
person.name = 'Jane'
console.log(person.name)
// Static members: Let's assume we need
// Some value or method from a class
// But we don't need the instance
// Math class is a fine example
// Since we use it for utility
// And all of its methods are static
// So we use static keyword
// And access the member directly from the class
class StaticClass {
    static IP_ADDRESS: string = '192.0.3.12'
}
console.log('\x1b[30m\x1b[42m%s\x1b[0m', `Current IP: ${StaticClass.IP_ADDRESS}`)
// Abstract classes: One the best use cases of abstract classes
// is that. Assume you need shapes like triangle, square or circle.
// They all differentiate in some way. But they have
// a lot in common like color and area
// So they have an ancestor as Shape let's say
// But shape doesn't implement any of these features
// Then we can easily say Shape is abstract
// And implement abstract features in offsprings
abstract class Shape {
    protected color: string

    constructor(color: string) {
        this.color = color
    }

    abstract calculateArea(): number
}

class Circle extends Shape {
    private radius: number

    constructor(color: string, radius: number) {
        super(color)
        this.radius = radius
    }

    calculateArea(): number {
        const rawResult = (Math.PI * Math.pow(this.radius, 2)).toString()
        // Tip: To convert string to number use + unary operator
        // At the beginning of the string
        return +rawResult.slice(0, rawResult.indexOf('.') + 6)
    }

    print(): void {
        console.log('\x1b[30m\x1b[47m%s\x1b[0m', `@Circle:[Color: ${this.color}, Area: ${this.calculateArea()}]`)
    }
}

const blueCircle = new Circle('blue', 2)
blueCircle.print()
// Advanced Techniques
// Constructor Function
// Tip: To create a variable for constructor do like below
class SoundAPI {
    static company: string = 'Solaris LTD'
    private _key: string

    constructor() {
        this._key = generateId()
    }

    get key(): string {
        return this._key
    }
}

const soundAPIMaker: typeof SoundAPI = SoundAPI
console.log(soundAPIMaker.company)
const soundAPIObject: SoundAPI = new soundAPIMaker()
console.log('\x1b[30m\x1b[43m%s\x1b[0m', `Key: [${soundAPIObject.key}]`)
// Like I said before
// You can use a class as an interface
class Point {
    x: number
    y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

interface Point3d extends Point {
    z: number
}

let point3d: Point3d = {x: 1, y: 2, z: 3}