import { Dialect } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config()

const databaseConfig = {
  development: {
    dialect: 'mysql' as Dialect,
    host: process.env.DB_HOST || 'your_mysql_username',
    port: 3306,
    username: process.env.DB_USER || 'your_mysql_username',
    password: process.env.DB_PASSWORD || 'your_mysql_password',
    database: process.env.DB_NAME || 'your_database_name',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  production: {
    dialect: 'mysql' as Dialect,
    use_env_variable: 'DATABASE_URL', // Use this for production when using environment variable for database connection
    pool: {
      max: 10,
      min: 2,
      acquire: 60000,
      idle: 20000,
    },
  },
};

export default databaseConfig;
