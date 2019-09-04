let dbConfig = require("../Utilities/mysqlConfig");



let getDistricts = (criteria, callback) => {
    dbConfig.getDB().query(`select * from districts where 1 order by name` , criteria, callback);
}

let getDistrictCount = (criteria, callback) => {
	
    dbConfig.getDB().query(`select count(*) as numDistricts from districts `, callback);
}
let getSchoolCount = (criteria, callback) => {
    let conditions = "";
    conditions = ` where distnum = ${criteria.distNum}`
    console.log(`  in DAO criteria->${criteria}<-`)
    console.log(`  in DAO conditions->${conditions}<-`)
    dbConfig.getDB().query(`select count(*) as numSchools from schools ${conditions}`, callback);
}

let getDistrictDetail = (criteria, callback) => {
	let conditions = "";
    criteria.id ? conditions += ` and id = '${criteria.id}'` : true;
    dbConfig.getDB().query(`select * from districts where 1 ${conditions}`, callback);
}

let createDistrict = (dataToSet, callback) => {
    let setData =  `INSERT INTO districts set  `
    dataToSet.name ? setData += `name = '${dataToSet.name}'` : true;
    dataToSet.addr ? setData += `, addr = '${dataToSet.addr}'` : true;
    dataToSet.city ? setData += `,city = '${dataToSet.city}'` : true;
    dataToSet.status ? setData += `, status = '${dataToSet.status}'` : true;
    dataToSet.zip ? setData += `, zip = '${dataToSet.zip}'` : true;
    dataToSet.enr ? setData += `, enr = '${dataToSet.enr}'` : true; 
    setData += `, distnum = '99099'`
    console.log( setData)
   dbConfig.getDB().query(`${setData}`, callback);
}




let deleteDistrict = (criteria, callback) => {
    let conditions = "";
   criteria.id ? conditions += ` id = '${criteria.id}'` : true;
   console.log(`delete from districts where ${conditions}`);
   dbConfig.getDB().query(`delete from districts where  ${conditions}`, callback);

}

let updateDistrict = (criteria,dataToSet,callback) => {
	let conditions = "";
    let setData = "";
    criteria.id ? conditions += ` id = '${criteria.id}'` : true;
    dataToSet.name ? setData += `name = '${dataToSet.name}'` : true;
    dataToSet.addr ? setData += `, addr = '${dataToSet.addr}'` : true;
    dataToSet.city ? setData += `,city = '${dataToSet.city}'` : true;
    dataToSet.status ? setData += `, status = '${dataToSet.status}'` : true;
    dataToSet.zip ? setData += `, zip = '${dataToSet.zip}'` : true;
    dataToSet.enr ? setData += `, enr = '${dataToSet.enr}'` : true;

   // console.log(`UPDATE districts SET ${setData} where ${conditions}`);
    dbConfig.getDB().query(`UPDATE districts SET ${setData} where  ${conditions}`, callback);
}
module.exports = {
    getDistricts : getDistricts,
    createDistrict : createDistrict,
    deleteDistrict : deleteDistrict,
    updateDistrict : updateDistrict,
    getDistrictDetail : getDistrictDetail,
    getDistrictCount : getDistrictCount,
    getSchoolCount : getSchoolCount
}