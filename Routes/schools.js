let express = require('express'),
    router = express.Router(),
    util = require('../Utilities/util'),
    schoolsService = require('../Services/schools');


/**Api to create school */
router.post('/create-school', (req, res) => {
    schoolsService.createSchool(req.body, (data) => {
        res.send(data);
    });
});

/**Api to update school */
router.put('/update-school', (req, res) => {
    schoolsService.updateSchool(req.body, (data) => {
        res.send(data);
    });
});

/**Api to delete the school */
router.delete('/delete-school', (req, res) => {
    schoolsService.deleteSchool(req.query, (data) => {
        res.send(data);
    });
});

/**Api to get the list of schools */
router.get('/get-school', (req, res) => {
    schoolsService.getSchools(req.query, (data) => {
        res.send(data);
    });
});
/**API to get the school by id... */
router.get('/get-school-by-id', (req, res) => {
    schoolsService.getSchoolById(req.query, (data) => {
        res.send(data);
    });
});
/**API to get the school by distnum... */
router.get('/get-school-by-distnum', (req, res) => {
    schoolsService.getSchoolByDistnum(req.query, (data) => {
        res.send(data);
    });
});
module.exports = router;
