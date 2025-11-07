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
