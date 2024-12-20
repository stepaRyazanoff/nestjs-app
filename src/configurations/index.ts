export default function () {
  return {
    port: process.env.PORT,
    db_port: process.env.DB_PORT,
    db_host: process.env.DB_HOST,
    db_name: process.env.DB_NAME,
    db_password: process.env.DB_PASSWORD,
    db_user: process.env.DB_USER,
    jwt_secret: process.env.JWT_SECRET,
    jwt_expire: process.env.JWT_EXPIRE,
  };
}
