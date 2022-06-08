module.exports = {
  type: 'sqlite',
  database: process.env.DATABASE_PATH,
  synchronize: true,
  logging: false,
  entities: [
    'dist/models/*.model.js'
  ]
}
