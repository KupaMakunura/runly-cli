# Client Setup

## Server URL

<!-- The deployed server URL -->

## Creating an Account

<!-- How to create an account and generate an API key -->

```bash
# Example: using the CLI script
npm run account:create
```

## Configuring Your MCP Client

<!-- Steps to connect an AI client (Claude, Cursor, etc.) to this MCP server -->

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "notes": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "<YOUR_SERVER_URL>/mcp"],
      "headers": {
        "Authorization": "Bearer <YOUR_API_KEY>"
      }
    }
  }
}
```

### Cursor

<!-- Cursor MCP configuration steps -->

## Verifying the Connection

<!-- How to confirm the MCP server is reachable and tools are available -->

## Troubleshooting

<!-- Common issues and fixes -->
