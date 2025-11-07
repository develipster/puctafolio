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
