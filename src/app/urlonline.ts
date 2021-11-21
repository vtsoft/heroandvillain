export class Urlonline {
    constructor(
        public list: string = "https://heroesvillains.000webhostapp.com/heroesvillains/api/listSuperhumans.php/",
        public create: string = "https://heroesvillains.000webhostapp.com/heroesvillains/api/createSuperhuman.php/",
        public update: string = "https://heroesvillains.000webhostapp.com/heroesvillains/api/updateSuperhuman.php/",
        public remove: string = "https://heroesvillains.000webhostapp.com/heroesvillains/api/deleteSuperhuman.php/",
        public upload: string = "https://heroesvillains.000webhostapp.com/heroesvillains/api/uploadSuperhuman.php",
        public resize: string = "https://heroesvillains.000webhostapp.com/heroesvillains/api/resizeSuperhuman.php"        
    ){}
}

