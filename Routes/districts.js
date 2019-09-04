let express = require('express'),
    router = express.Router(),
    util = require('../Utilities/util'),
    districtsService = require('../Services/districts');


/**Api to create district */
router.post('/create-district', (req, res) => {
    districtsService.createDistrict(req.body, (data) => {
        res.send(data);
    });
});

/**Api to update district */
router.put('/update-district', (req, res) => {
    districtsService.updateDistrict(req.body, (data) => {
        res.send(data);
    });
});

/**Api to delete the district */
router.delete('/delete-district', (req, res) => {
    districtsService.deleteDistrict(req.query, (data) => {
        res.send(data);
    });
});

/**Api to get the list of districts */
router.get('/get-district', (req, res) => {
    districtsService.getDistricts(req.query, (data) => {
        res.send(data);
    });
});
/**API to get the district by id... */
router.get('/get-district-by-id', (req, res) => {
    // console.log(`  in router.get BY ID req->${req}<-`)
    // console.log(req)
    // console.log(`  in router.get BY ID res->${res}<-`)
    // console.log(res)

    districtsService.getDistrictById(req.query, (data) => {
        res.send(data);
    });
});
/**API to get the district count - number of districts*/
router.get('/get-district-count', (req, res) => {
    districtsService.getCountOfDistricts(req.query, (data) => {
       let obj = data.district
       obj = JSON.stringify(obj)
       res.send(obj);
    });
});
/**API to get the district by id... */
router.get('/get-school-count', (req, res) => {
    // console.log(`  in router.get req->${req}<-`)
    // console.log(req)
    // console.log(`  in router.get res->${res}<-`)
    // console.log(res)
    districtsService.getCountOfSchools(req.query, (data) => {
        let obj = data.district
        obj = JSON.stringify(obj)
        res.send(obj);
       // res.send(data);
    });
});


module.exports = router;
