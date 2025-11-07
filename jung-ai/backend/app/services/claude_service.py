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
