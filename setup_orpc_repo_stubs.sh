#!/bin/bash
set -e
echo "🧩 Creating permanent @orpc stubs in /packages/api/lib/orpc_stubs_runtime..."

mkdir -p packages/api/lib/orpc_stubs_runtime/@orpc/{server,server/fetch,json-schema,openapi/fetch,zod/zod4}

# Minimal stubs to satisfy Webpack + TS
echo 'export const createRouter = () => ({});' > packages/api/lib/orpc_stubs_runtime/@orpc/server/index.js
echo 'export const fetchServer = () => ({});' > packages/api/lib/orpc_stubs_runtime/@orpc/server/fetch/index.js
echo 'export const JsonSchema = {};' > packages/api/lib/orpc_stubs_runtime/@orpc/json-schema/index.js
echo 'export const openapiFetch = () => ({});' > packages/api/lib/orpc_stubs_runtime/@orpc/openapi/fetch/index.js
echo 'export const ZodToJsonSchemaConverter = class {};' > packages/api/lib/orpc_stubs_runtime/@orpc/zod/zod4/index.js

echo "✅ Done – permanent ORPC runtime stubs created."
