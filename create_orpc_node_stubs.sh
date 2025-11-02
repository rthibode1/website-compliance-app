#!/bin/bash
set -e

echo "📦 Creating fake @orpc modules in node_modules..."

mkdir -p node_modules/@orpc/{server,server/fetch,json-schema,openapi/fetch,zod/zod4}

echo "export const createRouter = () => ({});" > node_modules/@orpc/server/index.js
echo "export const fetchServer = () => ({});" > node_modules/@orpc/server/fetch/index.js
echo "export const JsonSchema = {};" > node_modules/@orpc/json-schema/index.js
echo "export const openapiFetch = () => ({});" > node_modules/@orpc/openapi/fetch/index.js
echo "export const ZodToJsonSchemaConverter = class {};" > node_modules/@orpc/zod/zod4/index.js

echo "✅ All @orpc stub modules created successfully!"
