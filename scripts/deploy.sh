#!/usr/bin/env bash
set -euo pipefail

TARGET_ENVIRONMENT=${1:-}

if [[ -z "${TARGET_ENVIRONMENT}" ]]; then
  echo "Uso: ./scripts/deploy.sh <development|staging|production>"
  exit 1
fi

case "${TARGET_ENVIRONMENT}" in
  development|staging|production)
    echo "Iniciando deploy automatizado para ${TARGET_ENVIRONMENT}..."
    ;;
  *)
    echo "Ambiente inválido: ${TARGET_ENVIRONMENT}"
    exit 1
    ;;
esac

BUILD_ID="${GITHUB_SHA:-local}"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

echo "Build ID: ${BUILD_ID}"
echo "Timestamp: ${TIMESTAMP}"

echo "Empacotando versão para ${TARGET_ENVIRONMENT}"
tar -czf "release-${TARGET_ENVIRONMENT}-${BUILD_ID}.tar.gz" .next public package.json next.config.js

echo "Deploy para ${TARGET_ENVIRONMENT} concluído com sucesso."
