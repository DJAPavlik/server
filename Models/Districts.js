let mysqlConfig = require("../Utilities/mysqlConfig");

let initialize = () => {
    mysqlConfig.getDB().query(
        "create table IF NOT EXISTS districts (id INT NOT NULL AUTO_INCREMENT,	distnum  INT NOT NULL,	name	 VARCHAR(27) NOT NULL, addr	 VARCHAR(27) NOT NULL,	city	 VARCHAR(15) NOT NULL,	st	 VARCHAR(2)  NOT NULL,	zip	 VARCHAR(5)  NOT NULL,	enr	 int NOT NULL,	PRIMARY KEY (id) )"
        );

}

module.exports = {
    initialize: initialize
}

/**
CREATE TABLE districts (id INT NOT NULL AUTO_INCREMENT,	distnum  INT NOT NULL,	name	 VARCHAR(27) NOT NULL, addr	 VARCHAR(27) NOT NULL,	city	 VARCHAR(15) NOT NULL,	st	 VARCHAR(2)  NOT NULL,	zip	 VARCHAR(5)  NOT NULL,	enr	 int NOT NULL,	PRIMARY KEY (id) 
);
 */