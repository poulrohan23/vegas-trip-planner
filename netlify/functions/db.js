// Netlify Serverless Function for Database Operations
// This runs on Netlify's servers, not in the browser

const { neon } = require('@neondatabase/serverless');

// Database connection (uses environment variable on Netlify)
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_SPgiLzW63Hnv@ep-nameless-surf-ahqroo2t-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require';

let sql = null;
let initError = null;

try {
    if (DATABASE_URL) {
        sql = neon(DATABASE_URL);
    }
} catch (e) {
    console.error('Failed to initialize Neon client:', e);
    initError = e.message;
}

// Initialize table if it doesn't exist
async function initTable() {
    if (!sql) return false;
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS trip_data (
                key TEXT PRIMARY KEY,
                value JSONB NOT NULL,
                updated_at TIMESTAMP DEFAULT NOW()
            )
        `;
        return true;
    } catch (e) {
        console.error('Init table error:', e);
        return false;
    }
}

// CORS headers for cross-origin requests
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
};

exports.handler = async (event, context) => {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    // Check if database is configured
    if (!sql) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'Database not configured',
                hint: 'Set DATABASE_URL environment variable in Netlify',
                initError: initError
            })
        };
    }

    // Ensure table exists
    const tableReady = await initTable();

    try {
        const body = event.httpMethod === 'POST' ? JSON.parse(event.body || '{}') : {};
        const action = event.queryStringParameters?.action || body.action;

        switch (action) {
            case 'get': {
                const key = event.queryStringParameters?.key || body.key;
                if (!key) {
                    return {
                        statusCode: 400,
                        headers,
                        body: JSON.stringify({ error: 'Key is required' })
                    };
                }
                const result = await sql`
                    SELECT value FROM trip_data WHERE key = ${key}
                `;
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify({ 
                        success: true, 
                        value: result[0]?.value || null 
                    })
                };
            }

            case 'set': {
                const { key, value } = body;
                if (!key) {
                    return {
                        statusCode: 400,
                        headers,
                        body: JSON.stringify({ error: 'Key is required' })
                    };
                }
                await sql`
                    INSERT INTO trip_data (key, value, updated_at)
                    VALUES (${key}, ${JSON.stringify(value)}, NOW())
                    ON CONFLICT (key) 
                    DO UPDATE SET value = ${JSON.stringify(value)}, updated_at = NOW()
                `;
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify({ success: true })
                };
            }

            case 'getAll': {
                const result = await sql`
                    SELECT key, value FROM trip_data
                `;
                const data = {};
                result.forEach(row => {
                    data[row.key] = row.value;
                });
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify({ success: true, data })
                };
            }

            case 'ping': {
                return {
                    statusCode: 200,
                    headers,
                    body: JSON.stringify({ success: true, message: 'API is working!' })
                };
            }

            default:
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ error: 'Invalid action. Use: get, set, getAll, ping' })
                };
        }
    } catch (error) {
        console.error('Database error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Database operation failed', details: error.message })
        };
    }
};
