//Puerto
module.exports = {
    PORT: process.env.PORT || 3000,
    DATABASE: 'mongodb+srv://root:root@cluster0-opcnf.mongodb.net/codellege',
    DATABASE_LOCAL: 'mongodb://localhost:27017/codellege'
}

//vencimiento del token
// 60 segundos, 60 minutos, 24 horas, 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//sed de autenticacion
process.env.SEED = 'este-es-el-set-desarrollo';
