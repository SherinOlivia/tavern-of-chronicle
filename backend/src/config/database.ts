import { Pool } from 'pg';

const pool = new Pool({
    user: '',
    host: 'localhost',
    database: '',
    password: '',
    port: 5432,
})

export default pool;