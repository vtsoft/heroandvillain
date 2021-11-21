export class Urloffline {
    constructor(
        public list: string = "http://localhost/heroandvillain/superhuman/api/listSuperhumans.php/",
        public create: string = "http://localhost/heroandvillain/superhuman/api/createSuperhuman.php/",
        public update: string = "http://localhost/heroandvillain/superhuman/api/updateSuperhuman.php/",
        public remove: string = "http://localhost/heroandvillain/superhuman/api/deleteSuperhuman.php/",
        public upload: string = "http://localhost/heroandvillain/superhuman/api/uploadSuperhuman.php",
        public resize: string = "http://localhost/heroandvillain/superhuman/api/resizeSuperhuman.php"
    ){}
}

