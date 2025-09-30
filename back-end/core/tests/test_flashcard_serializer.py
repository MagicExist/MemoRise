import pytest
from rest_framework.test import APIRequestFactory
from rest_framework.exceptions import PermissionDenied
from django.urls import reverse
from core.models import Deck, Flashcard, User
from core.serializer import FlashCardSerializer

@pytest.mark.django_db
def test_flashcard_serializer_creates_flashcard(create_user, create_deck):
    """
    valid payload creates the flashcard in DB and sets defaults.
    Assumes create_deck is a fixture that returns a Deck for create_user.
    """
    factory = APIRequestFactory()
    request = factory.post("/api/flashcards/")  # path doesn't matter, we just need request
    request.user = create_user

    payload = {
        "deck": create_deck.id,
        "front": "What is the derivative of sin(x)?",
        "back": "cos(x)"
    }

    serializer = FlashCardSerializer(data=payload, context={"request": request})
    assert serializer.is_valid(), serializer.errors

    flashcard = serializer.save()

    assert isinstance(flashcard, Flashcard)
    assert flashcard.deck == create_deck
    assert flashcard.front == payload["front"]
    assert flashcard.back == payload["back"]

    # read-only fields should be set automatically or have defaults
    assert flashcard.status is not None
    assert flashcard.interval is not None