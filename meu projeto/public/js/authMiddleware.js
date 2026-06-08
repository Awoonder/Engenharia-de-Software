// authMiddleware.js
function verificarAdmin(req, res, next) {
    // Supondo que você use sessões (express-session)
    if (req.session && req.session.usuario && req.session.usuario.perfil === 'admin') {
        return next(); // Usuário autorizado, continua para a rota
    } else {
        return res.status(403).json({ erro: 'Acesso negado: Administrador necessário.' });
    }
}

module.exports = { verificarAdmin };
