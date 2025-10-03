import pytest
from rest_framework.test import APIRequestFactory
from core.models import Deck
from core.serializer import DeckSerializer

@pytest.mark.django_db
def test_deck_serializer_relates_user(create_user):
    """
    Test that the DeckSerializer correctly assigns the authenticated user
    to a newly created Deck instance.

    Steps:
    1. Build a fake request and manually attach an authenticated user.
    2. Provide a valid deck payload to the serializer along with the request context.
    3. Ensure the serializer validates successfully.
    4. Save the deck through the serializer.
    5. Verify that:
       - The saved object is a Deck instance.
       - The Deck is related to the given user.
       - The Deck fields (title and color) match the payload.
    """
    
    factory = APIRequestFactory()

    request = factory.post("/api/decks/")
    request.user = create_user

    payload = {
        "title": "Networking Deck",
        "description": "OSI Layers",
        "color": "#9333EA"
    }

    serializer = DeckSerializer(data=payload,context={"request":request})
    assert serializer.is_valid(), serializer.errors

    deck = serializer.save()

    assert isinstance(deck, Deck)
    assert deck.user == create_user
    assert deck.title == payload["title"]
    assert deck.color == payload["color"]