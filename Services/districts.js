let async = require('async'),
    parseString = require('xml2js').parseString;

let util = require('../Utilities/util'),
    districtDAO = require('../DAO/districtsDAO');
    

    /**API to create the atricle */
    let createDistrict = (data, callback) => { 
       async.auto({
            district: (cb) => {
               var dataToSet = {
                   "name":data.name,
                   "addr":data.addr,
                   "city": data.city,
                   "status":data.status,
                   "zip": data.zip,
                   "enr":data.enr,
               }
               console.log(dataToSet);
               districtDAO.createDistrict(dataToSet, (err, dbData) => {
                   if (err) {
                       console.log('ERROR')
                       cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SERVER_BUSY });
                       return;
                   } 
                   console.log('NOT ERROR    NOT ERROR')
                   console.log(dataToSet)
                   cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DATA_UPDATED,"result":dataToSet });    
               });
           }
        //]
       }, (err, response) => {
           console.log( '       --- After ')
           console.log(response)
           callback(response.district);
       });
    }

    /**API to update the district */
    let updateDistrict = (data,callback) => {
        async.auto({
            districtUpdate :(cb) =>{
                    if (!data.id) {
                        cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING })
                        return;
                    }
                    console.log('phase 1');
                    var criteria = {
                        id : data.id, 
                    }
                    var dataToSet={
                        "name": data.name,
                        "addr":data.addr,
                        "city": data.city,
                        "status":data.status,
                        "zip": data.zip,
                        "enr":data.enr,
                    }
                    console.log(criteria,'test',dataToSet);
					districtDAO.updateDistrict(criteria, dataToSet, (err, dbData)=>{
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
            callback(response.districtUpdate);
        });
    }

    /**API to delete a district */
    let deleteDistrict = (data,callback) => {
        console.log(data,'data to set')
        async.auto({
            removeDistrict :(cb) =>{
                    if (!data.id) {
                        cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING })
                        return;
                    }
                    var criteria = {
                        id : data.id, 
                    }
                    districtDAO.deleteDistrict(criteria,(err,dbData) => {
                        if (err) {
                            console.log(err);
                            cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.SERVER_BUSY });
                            return;
                        }  
                        cb(null, { "statusCode": util.statusCode.OK, "statusMessage": util.statusMessage.DELETE_DATA });    
                    });
            }
        }, (err,response) => {
            callback(response.removeDistrict);
        });
    }

    /***API to get the district list */
    let getDistricts = (data, callback) => {
        async.auto({
            district: (cb) => {
                districtDAO.getDistricts({},(err, data) => {
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
    //        console.log(response.district)
            callback(response.district); 
        })
    }         
    
    /***API to get the district detail by id */
    let getDistrictById = (data, callback) => {
        console.log(`START of getDistrictById  data->${{data}}<-`)
        console.log(data)
        async.auto({
            district: (cb) => {
                let criteria = {
                    "id":data.id
                }
                console.log(`criteria->${{criteria}}<-`)
                console.log(criteria)

                districtDAO.getDistrictDetail(criteria,(err, data) => {
                    if (err) {
                        console.log(err,'error----');
                        cb(null, {"errorCode": util.statusCode.INTERNAL_SERVER_ERROR,"statusMessage": util.statusMessage.SERVER_BUSY});
                        return;
                    }
                    console.log( ` After count - ${data}`)
                    console.log(data)
                    cb(null, data[0]);                           
                    return;
                });                
            }
        }, (err, response) => {
            callback(response.district); 
        })
    } 
       /***API to get the number of districts */
    let getCountOfDistricts = (data, callback) => {
        async.auto({
            district: (cb) => {
                let criteria = {
                    "id":data.id
                }
                districtDAO.getDistrictCount(criteria,(err, data) => {
                    if (err) {
                  //      console.log(err,'error----');
                        cb(null, {"errorCode": util.statusCode.INTERNAL_SERVER_ERROR,"statusMessage": util.statusMessage.SERVER_BUSY});
                        return;
                    }
                //    console.log( ` After count - ${data}`)
                    cb(null, data);                           
                    return;
                });                
            }
        }, (err, response) => {
          //  console.log( `     err - ${response}`)
            callback(response); 
        })
    }   // end getCountOfDistricts(...)


    /*** API to get the number of schools w/i district number */
    let getCountOfSchools = (data, callback) => {
        // console.log(`START of getCount  data->${data}<-`)
        // console.log(data)
        async.auto({
            
            district: (cb) => {
                let criteria = {
                    "distNum":data.distNum
                }
                // console.log(`criteria->${criteria}<-`)
                // console.log(criteria)
                districtDAO.getSchoolCount(criteria,(err, data) => {
                    if (err) {
                  //      console.log(err,'error----');
                        cb(null, {"errorCode": util.statusCode.INTERNAL_SERVER_ERROR,"statusMessage": util.statusMessage.SERVER_BUSY});
                        return;
                    }
                  console.log( ` After count - ${data}`)
                  console.log(data)
                  //cb(data,null)
                    cb(null, data);                           
                    return;
                });                
            }
        }, (err, response) => {
          //  console.log( `     err - ${response}`)
            callback(response); 
        })
    }   // end getCountOfSchools(...)
    


module.exports = {    
    createDistrict : createDistrict,
    updateDistrict : updateDistrict,
    deleteDistrict : deleteDistrict,
    getDistricts : getDistricts,
    getDistrictById : getDistrictById,
    getCountOfDistricts: getCountOfDistricts,
    getCountOfSchools: getCountOfSchools
};
