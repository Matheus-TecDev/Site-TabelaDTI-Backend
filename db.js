    require("dotenv").config();
    const mysql = require("mysql2");

    // 🏊 Cria o pool de conexões
    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    // Testa conexão (opcional)
    pool.getConnection((err, connection) => {
        if (err) {
            console.error("❌ Erro ao conectar no banco:", err);
        } else {
            console.log("✅ Conectado ao MySQL via pool");
            connection.release();
        }
    });

    module.exports = pool;
