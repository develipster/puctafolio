# Jung.AI Implementation Plan & Claude Code Instructions

## Technology Stack Selection for Free Tier

### LLM Model Recommendation: **Anthropic Claude (Sonnet)**
**Reasoning:**
- ✅ **Best for psychology**: Superior nuanced understanding vs GPT
- ✅ **Longer context**: 200K tokens (crucial for Jung's lengthy passages)
- ✅ **Free tier**: $5 initial credit on new accounts
- ✅ **Ethical alignment**: Strong safety guardrails for therapeutic content
- ✅ **API simplicity**: Clean Python/TypeScript SDKs

**Alternative**: Ollama with `llama3.1:8b` (fully local, free, but requires good hardware)

### Vector Database Recommendation: **Qdrant**
**Reasoning:**
- ✅ **Free tier**: 1GB storage (enough for Jung's complete works)
- ✅ **No credit card required**: True free tier
- ✅ **Performance**: Fast similarity search
- ✅ **Hybrid search**: Supports dense + sparse vectors
- ✅ **Python SDK**: Excellent developer experience
- ✅ **Cloud + Local**: Can develop locally, deploy to cloud

**Comparison:**
| Feature | Qdrant | Pinecone | Weaviate | Milvus |
|---------|--------|----------|----------|---------|
| Free Tier | 1GB, no CC | 1 index, limited | 14-day trial | Self-hosted only |
| Ease of Setup | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| Python SDK | Excellent | Excellent | Good | Fair |
| Hybrid Search | ✅ | ❌ | ✅ | ✅ |

---

## Project Structure

```
jung-ai/
├── backend/                      # FastAPI + RAG Pipeline
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI app
│   │   ├── config.py            # Environment config
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   └── schemas.py       # Pydantic models
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── qdrant_service.py     # Vector DB operations
│   │   │   ├── embedding_service.py  # Generate embeddings
│   │   │   ├── claude_service.py     # LLM integration
│   │   │   └── rag_service.py        # RAG orchestration
│   │   ├── routers/
│   │   │   ├── __init__.py
│   │   │   ├── chat.py          # Chat endpoints
│   │   │   └── analysis.py      # Personality/archetype analysis
│   │   └── utils/
│   │       ├── __init__.py
│   │       └── prompts.py       # System prompts
│   ├── data/
│   │   ├── jung_texts/          # Raw Jung texts (PDF/TXT)
│   │   └── processed/           # Chunked and cleaned
│   ├── scripts/
│   │   ├── ingest_texts.py      # Process and upload to Qdrant
│   │   └── test_rag.py          # Test RAG pipeline
│   ├── requirements.txt
│   ├── .env.example
│   └── README.md
├── frontend/                     # Next.js App (in puctafolio)
│   └── app/jung-ai/             # Will integrate later
└── docs/
    └── SETUP.md                 # Detailed setup guide
```

---

## Instructions for Claude Code (Agent Mode)

```markdown
# Claude Code Task: Jung.AI Backend Implementation

## Mission
Build a production-ready RAG (Retrieval Augmented Generation) system for Jung.AI that:
1. Ingests Carl Jung's texts into Qdrant vector database
2. Provides FastAPI endpoints for chat and analysis
3. Integrates Anthropic Claude for Jungian-informed responses
4. Implements hybrid search (semantic + keyword)
5. Includes ethical safeguards and conversation memory

## Phase 1: Project Setup & Environment Configuration

### Task 1.1: Create Project Structure
Create the following directory structure in a new `jung-ai/` folder:

```
jung-ai/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   └── schemas.py
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── qdrant_service.py
│   │   │   ├── embedding_service.py
│   │   │   ├── claude_service.py
│   │   │   └── rag_service.py
│   │   ├── routers/
│   │   │   ├── __init__.py
│   │   │   ├── chat.py
│   │   │   └── analysis.py
│   │   └── utils/
│   │       ├── __init__.py
│   │       └── prompts.py
│   ├── data/
│   │   ├── jung_texts/
│   │   └── processed/
│   ├── scripts/
│   │   ├── ingest_texts.py
│   │   └── test_rag.py
│   ├── requirements.txt
│   ├── .env.example
│   ├── .env
│   └── README.md
└── docs/
    └── SETUP.md
```

### Task 1.2: Create requirements.txt

File: `jung-ai/backend/requirements.txt`

```txt
# FastAPI & Server
fastapi==0.109.0
uvicorn[standard]==0.27.0
pydantic==2.5.3
pydantic-settings==2.1.0
python-dotenv==1.0.0

# AI & ML
anthropic==0.8.1
sentence-transformers==2.3.1
torch==2.1.2
numpy==1.26.3

# Vector Database
qdrant-client==1.7.3

# Text Processing
langchain==0.1.4
langchain-community==0.0.16
pypdf==4.0.1
tiktoken==0.5.2

# Utilities
python-multipart==0.0.6
aiofiles==23.2.1
httpx==0.26.0
```

### Task 1.3: Create .env.example

File: `jung-ai/backend/.env.example`

```bash
# ==============================================
# Jung.AI Environment Configuration
# ==============================================

# --- Anthropic Claude API ---
# Get your API key from: https://console.anthropic.com/
# Free tier: $5 credit on signup
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# --- Qdrant Vector Database ---
# Option 1: Qdrant Cloud (Recommended)
# Get free tier at: https://cloud.qdrant.io/
QDRANT_URL=https://xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.aws.cloud.qdrant.io
QDRANT_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Option 2: Local Qdrant (for development)
# Use this if running Qdrant locally via Docker
# QDRANT_URL=http://localhost:6333
# QDRANT_API_KEY=  # Leave empty for local

# --- Qdrant Collection Settings ---
QDRANT_COLLECTION_NAME=jung_complete_works
EMBEDDING_DIMENSION=768  # all-MiniLM-L6-v2 dimension

# --- Embedding Model ---
# Model for generating text embeddings
EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2

# --- Claude Model Configuration ---
CLAUDE_MODEL=claude-sonnet-4-20250514
CLAUDE_MAX_TOKENS=4096
CLAUDE_TEMPERATURE=0.7

# --- RAG Configuration ---
# Number of text chunks to retrieve for context
RAG_TOP_K=5
# Minimum similarity score for retrieved chunks (0.0 - 1.0)
RAG_SIMILARITY_THRESHOLD=0.7
# Maximum chunk size for text splitting (tokens)
CHUNK_SIZE=800
# Overlap between chunks (tokens)
CHUNK_OVERLAP=100

# --- FastAPI Server ---
API_HOST=0.0.0.0
API_PORT=8000
API_RELOAD=true  # Set to false in production

# --- Security ---
# Generate with: openssl rand -hex 32
JWT_SECRET_KEY=your-secret-key-here-generate-with-openssl
JWT_ALGORITHM=HS256
JWT_EXPIRATION_MINUTES=60

# --- CORS Origins ---
# Comma-separated list of allowed origins
CORS_ORIGINS=http://localhost:3000,http://localhost:8000

# --- Logging ---
LOG_LEVEL=INFO  # DEBUG, INFO, WARNING, ERROR, CRITICAL

# --- Rate Limiting ---
RATE_LIMIT_PER_MINUTE=20
MAX_CONVERSATION_LENGTH=50  # Max messages in conversation history

# --- Feature Flags ---
ENABLE_DREAM_ANALYSIS=false
ENABLE_ARCHETYPE_DETECTION=false
ENABLE_GAMIFICATION=false
```

### Task 1.4: Create .env (with dummy values)

File: `jung-ai/backend/.env`

```bash
# Jung.AI Environment Configuration (Development)
# IMPORTANT: Replace dummy values with real credentials

ANTHROPIC_API_KEY=sk-ant-api03-DUMMY-REPLACE-ME
QDRANT_URL=http://localhost:6333
QDRANT_API_KEY=
QDRANT_COLLECTION_NAME=jung_complete_works
EMBEDDING_DIMENSION=768
EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2
CLAUDE_MODEL=claude-sonnet-4-20250514
CLAUDE_MAX_TOKENS=4096
CLAUDE_TEMPERATURE=0.7
RAG_TOP_K=5
RAG_SIMILARITY_THRESHOLD=0.7
CHUNK_SIZE=800
CHUNK_OVERLAP=100
API_HOST=0.0.0.0
API_PORT=8000
API_RELOAD=true
JWT_SECRET_KEY=dummy-secret-key-replace-in-production
JWT_ALGORITHM=HS256
JWT_EXPIRATION_MINUTES=60
CORS_ORIGINS=http://localhost:3000,http://localhost:8000
LOG_LEVEL=INFO
RATE_LIMIT_PER_MINUTE=20
MAX_CONVERSATION_LENGTH=50
ENABLE_DREAM_ANALYSIS=false
ENABLE_ARCHETYPE_DETECTION=false
ENABLE_GAMIFICATION=false
```

### Task 1.5: Create Configuration Module

File: `jung-ai/backend/app/config.py`

```python
"""
Application configuration management using Pydantic Settings.
Loads environment variables from .env file.
"""

from pydantic_settings import BaseSettings
from functools import lru_cache
from typing import List


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # Anthropic Claude
    anthropic_api_key: str
    claude_model: str = "claude-sonnet-4-20250514"
    claude_max_tokens: int = 4096
    claude_temperature: float = 0.7
    
    # Qdrant Vector Database
    qdrant_url: str
    qdrant_api_key: str = ""
    qdrant_collection_name: str = "jung_complete_works"
    embedding_dimension: int = 768
    
    # Embedding Model
    embedding_model: str = "sentence-transformers/all-MiniLM-L6-v2"
    
    # RAG Configuration
    rag_top_k: int = 5
    rag_similarity_threshold: float = 0.7
    chunk_size: int = 800
    chunk_overlap: int = 100
    
    # FastAPI Server
    api_host: str = "0.0.0.0"
    api_port: int = 8000
    api_reload: bool = True
    
    # Security
    jwt_secret_key: str
    jwt_algorithm: str = "HS256"
    jwt_expiration_minutes: int = 60
    
    # CORS
    cors_origins: str = "http://localhost:3000,http://localhost:8000"
    
    # Logging
    log_level: str = "INFO"
    
    # Rate Limiting
    rate_limit_per_minute: int = 20
    max_conversation_length: int = 50
    
    # Feature Flags
    enable_dream_analysis: bool = False
    enable_archetype_detection: bool = False
    enable_gamification: bool = False
    
    @property
    def cors_origins_list(self) -> List[str]:
        """Parse CORS origins string into list."""
        return [origin.strip() for origin in self.cors_origins.split(",")]
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False


@lru_cache()
def get_settings() -> Settings:
    """
    Get cached settings instance.
    Uses lru_cache to avoid re-reading .env file on every call.
    """
    return Settings()


# Convenience instance for imports
settings = get_settings()
```

---

## Phase 2: Pydantic Models & Schemas

### Task 2.1: Create Data Models

File: `jung-ai/backend/app/models/schemas.py`

```python
"""
Pydantic models for request/response schemas.
"""

from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
from enum import Enum


class MessageRole(str, Enum):
    """Message role in conversation."""
    USER = "user"
    ASSISTANT = "assistant"
    SYSTEM = "system"


class Message(BaseModel):
    """Single message in a conversation."""
    role: MessageRole
    content: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class ChatRequest(BaseModel):
    """Request body for chat endpoint."""
    message: str = Field(..., min_length=1, max_length=2000)
    conversation_id: Optional[str] = None
    conversation_history: List[Message] = Field(default_factory=list)
    
    class Config:
        json_schema_extra = {
            "example": {
                "message": "I've been having recurring dreams about being lost in a forest.",
                "conversation_history": []
            }
        }


class RetrievedChunk(BaseModel):
    """Text chunk retrieved from vector database."""
    text: str
    score: float
    metadata: Dict[str, Any]


class ChatResponse(BaseModel):
    """Response from chat endpoint."""
    response: str
    conversation_id: str
    retrieved_context: List[RetrievedChunk]
    processing_time_ms: float
    
    class Config:
        json_schema_extra = {
            "example": {
                "response": "The forest is a powerful archetypal symbol...",
                "conversation_id": "conv_123abc",
                "retrieved_context": [],
                "processing_time_ms": 1234.56
            }
        }


class PsychologicalType(str, Enum):
    """Jung's 8 psychological types."""
    EXTRAVERTED_THINKING = "extraverted_thinking"
    INTROVERTED_THINKING = "introverted_thinking"
    EXTRAVERTED_FEELING = "extraverted_feeling"
    INTROVERTED_FEELING = "introverted_feeling"
    EXTRAVERTED_SENSING = "extraverted_sensing"
    INTROVERTED_SENSING = "introverted_sensing"
    EXTRAVERTED_INTUITION = "extraverted_intuition"
    INTROVERTED_INTUITION = "introverted_intuition"


class Archetype(str, Enum):
    """Major Jungian archetypes."""
    SELF = "self"
    SHADOW = "shadow"
    ANIMA = "anima"
    ANIMUS = "animus"
    PERSONA = "persona"
    WISE_OLD_MAN = "wise_old_man"
    GREAT_MOTHER = "great_mother"
    HERO = "hero"
    TRICKSTER = "trickster"


class PersonalityAnalysisRequest(BaseModel):
    """Request for personality type analysis."""
    conversation_history: List[Message]
    
    class Config:
        json_schema_extra = {
            "example": {
                "conversation_history": [
                    {"role": "user", "content": "I prefer logic over emotions"},
                    {"role": "assistant", "content": "That suggests..."}
                ]
            }
        }


class PersonalityAnalysisResponse(BaseModel):
    """Response with personality analysis."""
    psychological_type: PsychologicalType
    confidence: float = Field(..., ge=0.0, le=1.0)
    dominant_function: str
    auxiliary_function: str
    explanation: str


class ArchetypeAnalysisResponse(BaseModel):
    """Response with archetype analysis."""
    active_archetypes: List[Archetype]
    archetype_scores: Dict[str, float]
    interpretation: str


class HealthStatus(BaseModel):
    """API health check response."""
    status: str
    qdrant_connected: bool
    embedding_model_loaded: bool
    claude_api_available: bool
    timestamp: datetime = Field(default_factory=datetime.utcnow)
```

---

## Phase 3: Core Services

### Task 3.1: Embedding Service

File: `jung-ai/backend/app/services/embedding_service.py`

```python
"""
Service for generating text embeddings using sentence-transformers.
"""

from sentence_transformers import SentenceTransformer
from typing import List, Union
import logging
from functools import lru_cache

from app.config import settings

logger = logging.getLogger(__name__)


class EmbeddingService:
    """Handles text embedding generation."""
    
    def __init__(self):
        """Initialize embedding model."""
        logger.info(f"Loading embedding model: {settings.embedding_model}")
        self.model = SentenceTransformer(settings.embedding_model)
        self.dimension = settings.embedding_dimension
        logger.info(f"Embedding model loaded. Dimension: {self.dimension}")
    
    def encode(self, texts: Union[str, List[str]]) -> Union[List[float], List[List[float]]]:
        """
        Generate embeddings for text(s).
        
        Args:
            texts: Single text string or list of texts
            
        Returns:
            Embedding vector(s)
        """
        if isinstance(texts, str):
            # Single text
            embedding = self.model.encode(texts, convert_to_numpy=True)
            return embedding.tolist()
        else:
            # Multiple texts
            embeddings = self.model.encode(texts, convert_to_numpy=True)
            return embeddings.tolist()
    
    def encode_batch(self, texts: List[str], batch_size: int = 32) -> List[List[float]]:
        """
        Generate embeddings for large batch of texts.
        
        Args:
            texts: List of text strings
            batch_size: Number of texts to process at once
            
        Returns:
            List of embedding vectors
        """
        embeddings = self.model.encode(
            texts,
            batch_size=batch_size,
            show_progress_bar=True,
            convert_to_numpy=True
        )
        return embeddings.tolist()


@lru_cache()
def get_embedding_service() -> EmbeddingService:
    """Get cached embedding service instance."""
    return EmbeddingService()
```

### Task 3.2: Qdrant Service

File: `jung-ai/backend/app/services/qdrant_service.py`

```python
"""
Service for interacting with Qdrant vector database.
"""

from qdrant_client import QdrantClient
from qdrant_client.models import (
    Distance,
    VectorParams,
    PointStruct,
    Filter,
    FieldCondition,
    MatchValue,
    SearchRequest
)
from typing import List, Dict, Any, Optional
import logging
import uuid

from app.config import settings
from app.models.schemas import RetrievedChunk

logger = logging.getLogger(__name__)


class QdrantService:
    """Handles all Qdrant vector database operations."""
    
    def __init__(self):
        """Initialize Qdrant client and connect to cluster."""
        logger.info(f"Connecting to Qdrant at: {settings.qdrant_url}")
        
        if settings.qdrant_api_key:
            # Cloud instance with API key
            self.client = QdrantClient(
                url=settings.qdrant_url,
                api_key=settings.qdrant_api_key
            )
        else:
            # Local instance without API key
            self.client = QdrantClient(url=settings.qdrant_url)
        
        self.collection_name = settings.qdrant_collection_name
        logger.info("Successfully connected to Qdrant")
    
    def create_collection_if_not_exists(self):
        """Create collection if it doesn't exist."""
        try:
            collections = self.client.get_collections().collections
            collection_names = [col.name for col in collections]
            
            if self.collection_name not in collection_names:
                logger.info(f"Creating collection: {self.collection_name}")
                self.client.create_collection(
                    collection_name=self.collection_name,
                    vectors_config=VectorParams(
                        size=settings.embedding_dimension,
                        distance=Distance.COSINE
                    )
                )
                logger.info("Collection created successfully")
            else:
                logger.info(f"Collection '{self.collection_name}' already exists")
        except Exception as e:
            logger.error(f"Error creating collection: {e}")
            raise
    
    def upsert_points(
        self,
        texts: List[str],
        embeddings: List[List[float]],
        metadata_list: List[Dict[str, Any]]
    ) -> List[str]:
        """
        Insert or update points in Qdrant.
        
        Args:
            texts: List of text chunks
            embeddings: List of embedding vectors
            metadata_list: List of metadata dicts for each chunk
            
        Returns:
            List of point IDs
        """
        points = []
        point_ids = []
        
        for text, embedding, metadata in zip(texts, embeddings, metadata_list):
            point_id = str(uuid.uuid4())
            point_ids.append(point_id)
            
            payload = {
                "text": text,
                **metadata
            }
            
            points.append(
                PointStruct(
                    id=point_id,
                    vector=embedding,
                    payload=payload
                )
            )
        
        self.client.upsert(
            collection_name=self.collection_name,
            points=points
        )
        
        logger.info(f"Upserted {len(points)} points to Qdrant")
        return point_ids
    
    def search(
        self,
        query_embedding: List[float],
        top_k: int = None,
        score_threshold: float = None,
        filter_dict: Optional[Dict[str, Any]] = None
    ) -> List[RetrievedChunk]:
        """
        Search for similar vectors in Qdrant.
        
        Args:
            query_embedding: Query vector
            top_k: Number of results to return
            score_threshold: Minimum similarity score
            filter_dict: Optional metadata filters
            
        Returns:
            List of retrieved chunks with scores
        """
        top_k = top_k or settings.rag_top_k
        score_threshold = score_threshold or settings.rag_similarity_threshold
        
        # Build filter if provided
        query_filter = None
        if filter_dict:
            conditions = [
                FieldCondition(
                    key=key,
                    match=MatchValue(value=value)
                )
                for key, value in filter_dict.items()
            ]
            query_filter = Filter(must=conditions)
        
        # Execute search
        results = self.client.search(
            collection_name=self.collection_name,
            query_vector=query_embedding,
            limit=top_k,
            score_threshold=score_threshold,
            query_filter=query_filter
        )
        
        # Format results
        chunks = []
        for result in results:
            chunk = RetrievedChunk(
                text=result.payload.get("text", ""),
                score=result.score,
                metadata={
                    k: v for k, v in result.payload.items()
                    if k != "text"
                }
            )
            chunks.append(chunk)
        
        logger.info(f"Retrieved {len(chunks)} chunks from Qdrant")
        return chunks
    
    def get_collection_info(self) -> Dict[str, Any]:
        """Get information about the collection."""
        try:
            info = self.client.get_collection(self.collection_name)
            return {
                "name": self.collection_name,
                "vectors_count": info.vectors_count,
                "points_count": info.points_count,
                "status": info.status
            }
        except Exception as e:
            logger.error(f"Error getting collection info: {e}")
            return {"error": str(e)}
    
    def health_check(self) -> bool:
        """Check if Qdrant is accessible."""
        try:
            self.client.get_collections()
            return True
        except Exception as e:
            logger.error(f"Qdrant health check failed: {e}")
            return False


def get_qdrant_service() -> QdrantService:
    """Get Qdrant service instance."""
    return QdrantService()
```

### Task 3.3: Claude Service

File: `jung-ai/backend/app/services/claude_service.py`

```python
"""
Service for interacting with Anthropic Claude API.
"""

from anthropic import Anthropic
from typing import List, Dict, Any
import logging

from app.config import settings
from app.models.schemas import Message

logger = logging.getLogger(__name__)


class ClaudeService:
    """Handles all Claude API interactions."""
    
    def __init__(self):
        """Initialize Anthropic client."""
        logger.info("Initializing Claude service")
        self.client = Anthropic(api_key=settings.anthropic_api_key)
        self.model = settings.claude_model
        self.max_tokens = settings.claude_max_tokens
        self.temperature = settings.claude_temperature
    
    def generate_response(
        self,
        messages: List[Dict[str, str]],
        system_prompt: str = None,
        temperature: float = None,
        max_tokens: int = None
    ) -> str:
        """
        Generate a response from Claude.
        
        Args:
            messages: List of message dicts with 'role' and 'content'
            system_prompt: Optional system prompt
            temperature: Optional temperature override
            max_tokens: Optional max_tokens override
            
        Returns:
            Claude's response text
        """
        try:
            response = self.client.messages.create(
                model=self.model,
                max_tokens=max_tokens or self.max_tokens,
                temperature=temperature or self.temperature,
                system=system_prompt,
                messages=messages
            )
            
            return response.content[0].text
        
        except Exception as e:
            logger.error(f"Error generating Claude response: {e}")
            raise
    
    def health_check(self) -> bool:
        """Check if Claude API is accessible."""
        try:
            # Simple test request
            self.client.messages.create(
                model=self.model,
                max_tokens=10,
                messages=[{"role": "user", "content": "Hi"}]
            )
            return True
        except Exception as e:
            logger.error(f"Claude health check failed: {e}")
            return False


def get_claude_service() -> ClaudeService:
    """Get Claude service instance."""
    return ClaudeService()
```

### Continue to Part 2 of instructions...

---

**STOPPING POINT FOR PART 1**

Would you like me to continue with:
- Part 2: RAG Service, System Prompts, and API Endpoints?
- Part 3: Text Ingestion Scripts and Testing?
- Part 4: Frontend Integration?

Let me know and I'll provide the next section of Claude Code instructions!