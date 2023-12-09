import { DataSource, DataSourceOptions } from "typeorm";

//npm run migration:generate -- src/db/migrations/InitialMigrations
export const dataSourceOptions: DataSourceOptions = {
    type: 'sqlite',
    database: './src/db/database.db',
    entities: [ 'dist/**/*.entity.js' ],
    migrations: [ 'dist/db/migrations/*.js']
}

const dataSource = new DataSource(dataSourceOptions)
export default dataSource
