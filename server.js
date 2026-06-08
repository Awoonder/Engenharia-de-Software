const session = require('express-session');
const { verificarAdmin } = require('./public/js/authMiddleware');

const express = require('express');


const app = express();
const PORT = process.env.PORT || 3000;
// Adicione esta linha no seu server.js, logo após inicializar o app
app.use(express.static('public'));

const path = require('path');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'login.html'));
});

app.use(session({
    secret: '1234', // Mude isso para algo único
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Use true se for usar HTTPS
}));



// ... configurações de session ...
app.use(express.static('public')); // Isso torna tudo na pasta public acessível

// Middleware para decodificar payloads estruturados em formato JSON
app.use(express.json());

// Cabeçalhos HTTP CORS para liberação e acoplamento seguro do Front-End local
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.post('/api/ordens', (req, res) => {
    const { id_cliente, equipamento, descricao } = req.body;
    const sql = "INSERT INTO ordens_servico (id_cliente, equipamento, descricao_defeito, data_abertura) VALUES (?, ?, ?, NOW())";
    
    db.query(sql, [id_cliente, equipamento, descricao], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "OS criada com sucesso!", id: result.insertId });
    });
});

app.post('/login', (req, res) => {
    const { usuario, senha } = req.body;

    const sql = "SELECT * FROM administradores WHERE usuario = ? AND senha = ?";
    
    db.query(sql, [usuario, senha], (err, results) => {
        if (err) return res.status(500).json({ success: false, message: "Erro no servidor" });

        if (results.length > 0) {
            // Sessão criada com sucesso
            req.session.usuario = { id: results[0].id, nome: results[0].usuario };
            return res.status(200).json({ success: true, message: "Login realizado com sucesso!" });
        } else {
            return res.status(401).json({ success: false, message: "Usuário ou senha incorretos." });
        }
    });
});

app.get('/verificar-sessao', (req, res) => {
    if (req.session.usuario) {
        res.status(200).json({ logado: true });
    } else {
        res.status(401).json({ logado: false });
    }
});

// Rota protegida: apenas admins podem ver ordens
app.get('/api/ordens', verificarAdmin, (req, res) => {
    // Seu código da query continua igual aqui embaixo...
    const querySQL = `...`; 
    // ...
});

// Configuração estrita de conexão com o SGBD MySQL (Usando sua credencial 'root')
// Substitua o bloco antigo de conexão por este:

// Rota RESTful para listagem unificada de Ordens de Serviço (SELECT JOIN)
app.get('/api/ordens', (req, res) => {
    const querySQL = `
        SELECT 
            CONCAT('OS-', os.id_os) AS numero_os,
            c.nome AS cliente,
            os.equipamento AS equipamento,
            os.descricao_defeito AS descricao,
            os.status AS status,
            DATE_FORMAT(os.data_abertura, '%d/%m/%Y') AS data,
            CONCAT('R$ ', REPLACE(FORMAT(os.valor_total, 2, 'pt_BR'), '.', '')) AS valor
        FROM ordens_servico os
        INNER JOIN clientes c ON os.id_cliente = c.id_cliente;
    `;

    db.query(querySQL, (err, results) => {
        if (err) {
            console.error('Falha de execução analítica de Query:', err);
            return res.status(500).json({ error: 'Falha interna do servidor de banco.' });
        }
        // Retorna o vetor relacional mapeado estruturalmente em JSON limpo
        res.json(results);
    });
});

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true"); // <--- ADICIONE ISSO
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Alocação de escuta de sockets na porta definida do Host local
app.listen(PORT, () => {
    console.log(`📡 Servidor rodando com maestria em http://localhost:${PORT}`);
});