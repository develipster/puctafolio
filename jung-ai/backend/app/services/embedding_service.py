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
