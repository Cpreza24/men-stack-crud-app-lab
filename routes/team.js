const router = require('express').Router();
const teamCtrl = require('../controllers/team');

router.get('/teams', teamCtrl.index);
router.get('/teams/new', teamCtrl.newTeam);
router.post('/teams', teamCtrl.postTeam);
router.get('/teams/:id', teamCtrl.showTeam);
router.get('/teams/:id/edit', teamCtrl.editTeam);
router.put('/teams/:id', teamCtrl.updateTeam);
router.delete('/teams/:id', teamCtrl.deleteTeam);

module.exports = router;
