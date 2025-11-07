# Jung.AI Backend

A production-ready RAG (Retrieval Augmented Generation) system for Jung.AI that provides Jungian psychology insights through conversational AI.

## 🏗️ Project Structure

```
jung-ai/backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app (to be created)
│   ├── config.py            # ✅ Environment configuration
│   ├── models/
│   │   ├── __init__.py
│   │   └── schemas.py       # ✅ Pydantic models
│   ├── services/
│   │   ├── __init__.py
│   │   ├── qdrant_service.py      # ✅ Vector DB operations
│   │   ├── embedding_service.py   # ✅ Generate embeddings
│   │   ├── claude_service.py      # ✅ LLM integration
│   │   └── rag_service.py         # RAG orchestration (to be created)
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── chat.py          # Chat endpoints (to be created)
│   │   └── analysis.py      # Analysis endpoints (to be created)
│   └── utils/
│       ├── __init__.py
│       └── prompts.py       # System prompts (to be created)
├── data/
│   ├── jung_texts/          # Raw Jung texts (PDF/TXT)
│   └── processed/           # Chunked and cleaned
├── scripts/
│   ├── ingest_texts.py      # Process and upload to Qdrant (to be created)
│   └── test_rag.py          # Test RAG pipeline (to be created)
├── requirements.txt         # ✅ Python dependencies
├── .env.example             # ✅ Example environment variables
├── .env                     # ✅ Your actual credentials (git-ignored)
└── README.md                # ✅ This file
```

## 🚀 Quick Start

### 1. Prerequisites

- Python 3.10+
- Docker (optional, for local Qdrant)

### 2. Installation

```bash
# Navigate to backend directory
cd jung-ai/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Configuration

**Option A: Qdrant Cloud (Recommended)**
1. Sign up at https://cloud.qdrant.io/
2. Create a cluster (free tier available)
3. Copy API key and cluster URL

**Option B: Local Qdrant**
```bash
docker run -p 6333:6333 qdrant/qdrant
```

**Get Anthropic API Key:**
1. Sign up at https://console.anthropic.com/
2. Get $5 free credit
3. Copy API key

**Update .env file:**
```bash
cp .env.example .env
# Edit .env with your actual credentials
```

### 4. Test Services

```python
# Test embedding service
python -c "from app.services.embedding_service import get_embedding_service; \
           svc = get_embedding_service(); \
           print(svc.encode('Test text'))"

# Test Qdrant connection
python -c "from app.services.qdrant_service import get_qdrant_service; \
           svc = get_qdrant_service(); \
           print(svc.health_check())"
```

## 🧩 Core Components

### Configuration (`app/config.py`)
- Environment variable management
- Settings validation with Pydantic
- Cached configuration loading

### Data Models (`app/models/schemas.py`)
- `Message`: Conversation message structure
- `ChatRequest`/`ChatResponse`: API request/response models
- `PsychologicalType`: Jung's 8 types
- `Archetype`: Major Jungian archetypes
- `HealthStatus`: System health check

### Services

#### Embedding Service (`app/services/embedding_service.py`)
- Loads sentence-transformers model
- Generates embeddings for text
- Batch processing support

#### Qdrant Service (`app/services/qdrant_service.py`)
- Vector database operations
- Collection management
- Semantic search
- Point upsert/retrieval

#### Claude Service (`app/services/claude_service.py`)
- Anthropic API integration
- Response generation
- Health monitoring

## 📝 Environment Variables

See `.env.example` for full configuration options.

**Essential variables:**
```bash
ANTHROPIC_API_KEY=sk-ant-api03-xxx
QDRANT_URL=https://xxx.cloud.qdrant.io  # or http://localhost:6333
QDRANT_API_KEY=xxx  # empty for local
```

## 🏃 Next Steps

1. **Create RAG Service** - Orchestrates embedding + retrieval + generation
2. **Create System Prompts** - Jungian therapeutic framework prompts
3. **Create API Endpoints** - FastAPI routers for chat and analysis
4. **Create Main App** - FastAPI application entry point
5. **Create Ingestion Scripts** - Process Jung's texts into Qdrant
6. **Test Pipeline** - End-to-end RAG testing

## 🧪 Testing

```bash
# Install test dependencies
pip install pytest pytest-asyncio httpx

# Run tests (when created)
pytest tests/
```

## 📚 Technology Stack

- **FastAPI**: Modern async web framework
- **Anthropic Claude**: LLM for response generation
- **Qdrant**: Vector database for similarity search
- **sentence-transformers**: Text embedding models
- **Pydantic**: Data validation and settings

## 🔒 Security Notes

- Never commit `.env` file with real credentials
- Use strong JWT secret in production
- Enable rate limiting for API endpoints
- Implement proper error handling for sensitive data

## 📖 Resources

- [Qdrant Documentation](https://qdrant.tech/documentation/)
- [Anthropic API Docs](https://docs.anthropic.com/)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Jung's Collected Works](https://www.cgjung.net/)

---

**Status**: Phase 1 Complete ✅
- Project structure created
- Configuration system implemented
- Core services developed
- Data models defined

**Next**: Implement RAG service and API endpoints

---

## 🗺️ Development Roadmap

### Phase 2: RAG Pipeline & System Prompts

**Objectives:**
- Create RAG service to orchestrate the full retrieval-generation pipeline
- Implement Jungian-specific system prompts
- Build conversation memory management

**Files to Create:**
- `app/services/rag_service.py` - RAG orchestration layer
- `app/utils/prompts.py` - System prompts for different contexts
- `app/utils/memory.py` - Conversation history management (optional)

**Key Features:**
1. **RAG Service**
   - Query embedding generation
   - Vector search execution
   - Context formatting for Claude
   - Response generation with retrieved context
   - Conversation history integration

2. **System Prompts**
   - Base therapeutic framework prompt
   - Four-stage process prompts (Confession, Elucidation, Education, Transformation)
   - Personality type analysis prompts
   - Archetype detection prompts
   - Dream interpretation prompts
   - Ethical safeguard prompts

3. **Context Management**
   - Chunk selection and ranking
   - Context window optimization
   - Relevance scoring
   - Source attribution

**Testing:**
```python
# Test RAG pipeline end-to-end
python scripts/test_rag.py --query "Tell me about the shadow"
```

---

### Phase 3: API Endpoints & FastAPI Application

**Objectives:**
- Create FastAPI application with proper middleware
- Implement chat and analysis endpoints
- Add health checks and monitoring

**Files to Create:**
- `app/main.py` - FastAPI application setup
- `app/routers/chat.py` - Chat conversation endpoints
- `app/routers/analysis.py` - Personality/archetype analysis
- `app/routers/health.py` - Health check endpoints
- `app/middleware/rate_limit.py` - Rate limiting (optional)
- `app/middleware/cors.py` - CORS configuration

**Endpoints to Implement:**

```
POST   /api/v1/chat              - Send message, get Jung.AI response
GET    /api/v1/chat/{conv_id}    - Retrieve conversation history
POST   /api/v1/analyze/personality - Analyze psychological type
POST   /api/v1/analyze/archetype   - Detect active archetypes
GET    /api/v1/health             - System health status
GET    /api/v1/collection/info    - Vector DB collection info
```

**Middleware:**
- CORS configuration for frontend
- Request logging
- Error handling
- Rate limiting
- Authentication (JWT, optional for MVP)

**Running the Server:**
```bash
# Development
uvicorn app.main:app --reload --port 8000

# Production
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

---

### Phase 4: Data Ingestion & Text Processing

**Objectives:**
- Process Jung's texts into chunks
- Generate embeddings and upload to Qdrant
- Validate data quality

**Files to Create:**
- `scripts/ingest_texts.py` - Main ingestion pipeline
- `scripts/download_jung_texts.py` - Fetch texts from sources
- `scripts/validate_ingestion.py` - Check data quality
- `app/utils/text_processing.py` - Chunking and cleaning utilities

**Data Sources:**
- Project Gutenberg (free public domain texts)
- Archive.org (Jung's works)
- Manual PDF uploads (user's collection)

**Ingestion Pipeline:**
1. **Text Extraction**
   - PDF parsing (pypdf)
   - Text cleaning (remove headers, footers, page numbers)
   - Chapter/section detection

2. **Chunking Strategy**
   - Semantic chunking (by paragraph/concept)
   - Fixed-size with overlap
   - Preserve context boundaries

3. **Metadata Enrichment**
   - Source book/volume
   - Chapter/section title
   - Publication year
   - Jung's life period (early/middle/late)
   - Key concepts mentioned

4. **Embedding Generation**
   - Batch processing for efficiency
   - Progress tracking
   - Error handling and retry logic

5. **Upload to Qdrant**
   - Create collection if needed
   - Upsert points with metadata
   - Verify upload success

**Running Ingestion:**
```bash
# Process all texts in data/jung_texts/
python scripts/ingest_texts.py --input data/jung_texts/ --batch-size 100

# Process specific file
python scripts/ingest_texts.py --file "data/jung_texts/man_and_his_symbols.pdf"

# Dry run (don't upload)
python scripts/ingest_texts.py --dry-run
```

**Validation:**
```bash
# Check collection statistics
python scripts/validate_ingestion.py --check-stats

# Test search quality
python scripts/validate_ingestion.py --test-queries
```

---

### Phase 5: Advanced Features (Post-MVP)

**Optional Enhancements:**

1. **Dream Analysis Module**
   - Symbol dictionary
   - Pattern recognition
   - Archetypal interpretation

2. **Archetype Detection Algorithm**
   - Train classifier on conversation patterns
   - Multi-archetype scoring
   - Temporal tracking (archetype evolution)

3. **Gamification Layer**
   - Symbolic journey metaphors
   - Progress visualization
   - Achievement system

4. **Personality Type Profiling**
   - Long-term user profiling
   - Type indicator tracking
   - Function development suggestions

5. **Multi-modal Support**
   - Voice input/output
   - Image analysis (drawings, dreams)
   - Video journal integration

---

## 🧪 Testing Strategy

### Unit Tests
```bash
pytest tests/unit/
```
- Test each service independently
- Mock external dependencies
- Cover edge cases

### Integration Tests
```bash
pytest tests/integration/
```
- Test service interactions
- Test API endpoints
- Test RAG pipeline end-to-end

### Load Tests
```bash
locust -f tests/load/locustfile.py
```
- Concurrent user simulation
- Response time monitoring
- Rate limit validation

---

## 📊 Monitoring & Observability

**Metrics to Track:**
- Request latency (P50, P95, P99)
- Embedding generation time
- Vector search latency
- Claude API response time
- Error rates by endpoint
- Active conversations
- Tokens consumed

**Logging Best Practices:**
- Structured logging (JSON format)
- Log levels (DEBUG for dev, INFO for prod)
- Request ID tracking
- PII redaction

**Tools:**
- Prometheus + Grafana (metrics)
- ELK Stack (logs)
- Sentry (error tracking)

---

## 🚀 Deployment Checklist

### Backend Deployment
- [ ] Update `.env` with production credentials
- [ ] Set `API_RELOAD=false` in production
- [ ] Configure proper CORS origins
- [ ] Enable rate limiting
- [ ] Set up SSL/TLS certificates
- [ ] Configure reverse proxy (Nginx)
- [ ] Set up process manager (systemd/supervisor)
- [ ] Configure log rotation
- [ ] Set up monitoring and alerts

### Vector Database
- [ ] Use Qdrant Cloud or self-hosted cluster
- [ ] Configure backups
- [ ] Set up replication (if critical)
- [ ] Monitor storage usage
- [ ] Implement index optimization

### Frontend Integration
- [ ] Configure API base URL
- [ ] Implement error handling
- [ ] Add loading states
- [ ] Handle connection failures
- [ ] Add WebSocket support (future)

---

## 🤝 Contributing

When adding new features:

1. **Create a feature branch**
   ```bash
   git checkout -b feature/new-feature
   ```

2. **Follow code style**
   - Use type hints
   - Add docstrings
   - Follow PEP 8

3. **Add tests**
   - Unit tests for logic
   - Integration tests for endpoints

4. **Update documentation**
   - Update README
   - Add API docs
   - Document new env vars

5. **Submit PR with description**

---

## 📝 Notes for Future Phases

### Performance Optimization
- Implement caching (Redis) for repeated queries
- Use async/await throughout
- Batch similar requests
- Optimize embedding model (distillation)
- Use connection pooling

### Scalability Considerations
- Horizontal scaling (multiple workers)
- Load balancing
- Queue system for long-running tasks (Celery)
- CDN for frontend assets

### Security Enhancements
- API key rotation
- Input validation and sanitization
- SQL injection prevention (N/A for vector DB)
- XSS protection
- HTTPS enforcement
- Security headers

---

**Current Status**: Phase 1 Complete ✅

**Next Steps**: Begin Phase 2 - RAG Service implementation
