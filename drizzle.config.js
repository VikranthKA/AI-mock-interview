/** @type {import("drizzle-kit").Config} */

export default{
    schema:"./utils/schema.js",
    dialect:'postgresql',
    dbCredentials:{
        url:'postgresql://neondb_owner:npg_l2QugKb5cxzC@ep-jolly-morning-a8yajo9d-pooler.eastus2.azure.neon.tech/neondb?sslmode=require'
    }
}