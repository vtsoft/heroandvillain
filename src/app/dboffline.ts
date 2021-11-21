export class Dboffline {
    constructor(
        public servername: string = "localhost:3306",
        public username: string = "root",
        public password: string = "",
        public dbname: string = "herovillain_db",
        public tbname: string = "herovillain",
        public online: Boolean = false        
    ){}
}
