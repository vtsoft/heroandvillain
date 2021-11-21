export class Superhumans {
    constructor(
        public _id: string = (Math.floor(Math.random()*1000)).toString(),
        public name: string = "",
        public heroorvillain = "",
        public description1: string = "",
        public description2: string = "",
        public imageurl: string = "",
        public alterego: string = "",
        public description: any = [],
        public height: string = "",
        public weight: string = "",
        public power: string = "",
        public enemy: string = "",
        public postedby: string = "",
        public postaccess: string = "",
        public datepost: string = ""
    ){}
}
