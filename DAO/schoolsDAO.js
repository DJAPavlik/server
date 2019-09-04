let dbConfig = require("../Utilities/mysqlConfig");



let getSchools = (criteria, callback) => {
    dbConfig.getDB().query(`select * from schools where 1`,criteria, callback);
}

let getSchoolDetail = (criteria, callback) => {
	let conditions = "";
    criteria.id ? conditions += ` and schnum = '${criteria.id}'` : true;
    dbConfig.getDB().query(`select * from schools where 1 ${conditions} order by name`, callback);
}   
let getSchoolDetailByDistnum = (criteria, callback) => {
	let conditions = "";
    criteria.distnum ? conditions += ` distnum = ${criteria.distnum}` : true;
    console.log(`select * from schools where  ${conditions}`);
    dbConfig.getDB().query(`select * from schools where  ${conditions} order by name`, callback);
}

let createSchool = (dataToSet, callback) => {
    console.log("insert into schools set ? ", dataToSet,'myproj')
    dbConfig.getDB().query("insert into schools set ? ", dataToSet, callback);
}

let deleteSchool = (criteria, callback) => {
    let conditions = "";
   criteria.id ? conditions += ` and schnum = '${criteria.id}'` : true;
   console.log(`delete from schools where 1 ${conditions}`);
   dbConfig.getDB().query(`delete from schools where 1 ${conditions}`, callback);

}

let updateSchool = (criteria,dataToSet,callback) => {
	let conditions = "";
    let setData = "";
    criteria.id ? conditions += ` and schnum = '${criteria.id}'` : true;
    dataToSet.category ? setData += `category = '${dataToSet.category}'` : true;
    dataToSet.title ? setData += `, title = '${dataToSet.title}'` : true;
    console.log(`UPDATE schools SET ${setData} where 1 ${conditions}`);
    dbConfig.getDB().query(`UPDATE schools SET ${setData} where 1 ${conditions}`, callback);
}
module.exports = {
    getSchools : getSchools,
    createSchool : createSchool,
    deleteSchool : deleteSchool,
    updateSchool : updateSchool,
    getSchoolDetail : getSchoolDetail,
    getSchoolDetailByDistnum : getSchoolDetailByDistnum
}