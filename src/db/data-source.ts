import { DataSource, DataSourceOptions } from "typeorm";

//npm run migration:generate -- src/db/migrations/InitialMigrations
export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1234',
    database: 'nestdb',
    entities: [ 'dist/**/*.entity.js' ],
    migrations: [ 'dist/db/migrations/*.js']
}

const dataSource = new DataSource(dataSourceOptions)
export default dataSource
