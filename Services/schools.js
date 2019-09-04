let async = require('async'),
    parseString = require('xml2js').parseString;

let util = require('../Utilities/util'),
    schoolDAO = require('../DAO/schoolsDAO');
    

    /**API to create the atricle */
    let createSchool = (data, callback) => { 
       async.auto({
            school: (cb) => {
               var dataToSet = {
                   "category":data.category?data.category:'',
                   "title":data.title,
               }
               console.log(dataToSet);
               schoolDAO.createSchool(dataToSet, (err, dbData) => {
                   if (err) {
                       cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SERVER_BUSY });
                       return;
                   } 
                   
                   cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_UPDATED,"result":dataToSet });    
               });
           }
        //]
       }, (err, response) => {
           callback(response.school);
       });
    }

    /**API to update the school */
    let updateSchool = (data,callback) => {
        async.auto({
            schoolUpdate :(cb) =>{
                    if (!data.id) {
                        cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING })
                        return;
                    }
                    console.log('phase 1');
                    var criteria = {
                        id : data.id, 
                    }
                    var dataToSet={
                        "category": data.category,
                        "title":data.title,
                    }
                    console.log(criteria,'test',dataToSet);
					schoolDAO.updateSchool(criteria, dataToSet, (err, dbData)=>{
						if(err){
                            cb(null,{"statusCode":util.statusCode.FOUR_ZERO_ONE,"statusMessage":util.statusMessage.SERVER_BUSY});
						return;	
						}
						else{
                            cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_UPDATED,"result":dataToSet  });    						
						}
					});
            }
        }, (err,response) => {
            callback(response.schoolUpdate);
        });
    }

    /**API to delete a school */
    let deleteSchool = (data,callback) => {
        console.log(data,'data to set')
        async.auto({
            removeSchool :(cb) =>{
                    if (!data.id) {
                        cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING })
                        return;
                    }
                    var criteria = {
                        id : data.id, 
                    }
                    schoolDAO.deleteSchool(criteria,(err,dbData) => {
                        if (err) {
                            console.log(err);
                            cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SERVER_BUSY });
                            return;
                        }  
                        cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DELETE_DATA });    
                    });
            }
        }, (err,response) => {
            callback(response.removeSchool);
        });
    }

    /***API to get the school list */
    let getSchools = (data, callback) => {
        async.auto({
            school: (cb) => {
                schoolDAO.getSchools({},(err, data) => {
                    if (err) {
                        console.log(data,'data testing----');
                        cb(null, {"errorCode": util.statusCode.INTERNAL_SERVER_ERROR,"statusMessage": util.statusMessage.SERVER_BUSY});
                        return;
                    }
                    cb(null, data);                           
                    return;
                });                
            }
        }, (err, response) => {
       //     console.log(response.school)
            callback(response.school); 
        })
    }         
    
    /***API to get the school detail by id */
    let getSchoolById = (data, callback) => {
        async.auto({
            school: (cb) => {
                let criteria = {
                    "id":data.id
                }
                console.log('in schools.js - getSchoolBy ID....')
                console.log(criteria)
                schoolDAO.getSchoolDetail(criteria,(err, data) => {
                    if (err) {
                        console.log(err,'error----');
                        cb(null, {"errorCode": util.statusCode.INTERNAL_SERVER_ERROR,"statusMessage": util.statusMessage.SERVER_BUSY});
                        return;
                    }
                    cb(null, data[0]);                           
                    return;
                });                
            }
        }, (err, response) => {
            console.log('B4')
            console.log(response.school)
            callback(response.school); 
            console.log('AFTER')
        })
    }     // end getSchoolById


      /***API to get the school detail by district number */
      let getSchoolByDistnum = (data, callback) => {
        async.auto({
            school: (cb) => {
                let criteria = {
                    "distnum":data.distnum
                }
                console.log('in schools.js - getSchoolBy DISTNUM....')
                console.log(criteria)
                schoolDAO.getSchoolDetailByDistnum(criteria,(err, data) => {
                    if (err) {
                        console.log(err,'error----');
                        cb(null, {"errorCode": util.statusCode.INTERNAL_SERVER_ERROR,"statusMessage": util.statusMessage.SERVER_BUSY});
                        return;
                    }
                    cb(null, data);                           
                    return;
                });                
            }
        }, (err, response) => {
          //  console.log(response.school)
          console.log('Before callback')
            callback(response.school); 
            console.log('AFTER CALLBACK')
        })
    }     // end getSchoolByDistnum

    
module.exports = {    
    createSchool : createSchool,
    updateSchool : updateSchool,
    deleteSchool : deleteSchool,
    getSchools : getSchools,
    getSchoolById : getSchoolById,
    getSchoolByDistnum : getSchoolByDistnum
};
