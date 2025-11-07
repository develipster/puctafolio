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
