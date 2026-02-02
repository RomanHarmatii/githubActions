// Load the MCP server configuration for use across tests.
const fs = require('fs');
const path = require('path');

const mcpConfigPath = path.resolve(__dirname, '../../mcp_servers.json');
let mcpServers;

try {
  const raw = fs.readFileSync(mcpConfigPath, 'utf-8');
  mcpServers = JSON.parse(raw);
} catch (e) {
  console.warn('Could not load MCP configuration:', e.message);
  mcpServers = {}; // fallback to empty object
}

module.exports = { mcpServers };