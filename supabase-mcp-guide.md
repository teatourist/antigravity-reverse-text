# Supabase MCP Configuration Guide (Reverse-Text)

This project is connected to Supabase for its backend features. To enable AI-powered database management using the Model Context Protocol (MCP), follow these steps:

## 1. Project Identity
- **Project ID**: `uuylolifmlscpledepco`
- **Region**: US-East

## 2. Local MCP Setup
If you are using an AI client that supports MCP (like Claude Desktop, Cursor, or a compatible VS Code extension), add the following to your MCP configuration:

```json
{
  "mcpServers": {
    "supabase-main": {
      "command": "npx",
      "args": ["-y", "@supabase/mcp-server"],
      "env": {
        "SUPABASE_ACCESS_TOKEN": "sbp_1fcbeb876d9b5e3309f115a78ae2a8b6e4d3e09a"
      }
    }
  }
}
```

## 3. Supported AI Actions
Once configured, the AI will have access to:
- Creating/Modifying tables
- Executing SQL migrations
- Managing Row Level Security (RLS)
- Inspecting schemas
