const express = require('express');
const router = express.Router();
const empresaController = require('../Controllers/EmpresaController');
const taskController = require('../Controllers/TaskController');
const carreiraController = require('../Controllers/CarreiraController');
const habilidadeController = require('../Controllers/HabilidadesController');
const gamingController = require('../Controllers/GamingController');
const logController = require('../Controllers/LogsController');
const loginController = require('../Controllers/LoginController');
const userController = require('../Controllers/UserController');
const authMiddleware = require('../Middlewares/AuthMiddleware');

// Rotas de login e registro
router.post('/login', loginController.login);
router.post('/register', userController.createUser);

// Exemplo de rota protegida (requer token JWT)
router.get('/protected', authMiddleware, (req, res) => {
    res.json({ message: 'Acesso permitido', user: req.user });
});

// Rotas para Empresa
// router.post('/empresas', empresaController.createEmpresa);
// router.get('/empresas/:id', empresaController.getEmpresaById);
// router.put('/empresas/:id', empresaController.updateEmpresa);
// router.delete('/empresas/:id', empresaController.deleteEmpresa);
router.get('/empresa/:id', authMiddleware, empresaController.getEmpresaById);
router.post('/empresa', authMiddleware, empresaController.createEmpresa);
router.put('/empresa/:id', authMiddleware, empresaController.updateEmpresa);
router.delete('/empresa/:id', authMiddleware, empresaController.deleteEmpresa);

// Rotas para Task
// router.post('/tasks', taskController.createTask);
// router.get('/tasks/:id', taskController.getTaskById);
// router.put('/tasks/:id', taskController.updateTask);
// router.delete('/tasks/:id', taskController.deleteTask);
router.get('/task/:id', authMiddleware, taskController.getTaskById);
router.post('/task', authMiddleware, taskController.createTask);
router.put('/task/:id', authMiddleware, taskController.updateTask);
router.delete('/task/:id', authMiddleware, taskController.deleteTask);

// Rotas para Carreira
router.post('/carreiras', carreiraController.createCarreira);
router.get('/carreiras/:id', carreiraController.getCarreiraById);
router.put('/carreiras/:id', carreiraController.updateCarreira);
router.delete('/carreiras/:id', carreiraController.deleteCarreira);

// Rotas para Habilidades
router.post('/habilidades', habilidadeController.createHabilidade);
router.get('/habilidades/:id', habilidadeController.getHabilidadeById);
router.put('/habilidades/:id', habilidadeController.updateHabilidade);
router.delete('/habilidades/:id', habilidadeController.deleteHabilidade);

// Rotas para Gaming
router.post('/gaming', gamingController.createGaming);
router.get('/gaming/:id', gamingController.getGamingById);
router.put('/gaming/:id', gamingController.updateGaming);
router.delete('/gaming/:id', gamingController.deleteGaming);

// Rotas para Logs
router.post('/logs', logController.createLog);
router.get('/logs/user/:id_user', logController.getLogsByUserId);
router.put('/logs/:id', logController.updateLog);
router.delete('/logs/:id', logController.deleteLog);

module.exports = router;
