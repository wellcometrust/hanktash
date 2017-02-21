#!/usr/bin/env bash
curl -H "Content-Type: application/json" -X POST --data-binary @./q.json localhost:8000/_search
