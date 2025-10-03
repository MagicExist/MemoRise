import pytest
from rest_framework.test import APIClient
from django.urls import reverse
from core.models import Deck, Flashcard


@pytest.mark.django_db
def test_create_flashcard_in_user_deck(create_user):
    """
    Ensure a user can create a flashcard inside their own deck.
    """
    client = APIClient()
    deck = Deck.objects.create(title="History", user=create_user)

    client.force_authenticate(user=create_user)
    url = reverse("flashcard-list")
    payload = {
        "deck": deck.id,
        "front": "Who discovered America?",
        "back": "Christopher Columbus"
    }

    response = client.post(url, payload, format="json")
    assert response.status_code == 201
    data = response.json()
    assert data["front"] == payload["front"]
    assert data["back"] == payload["back"]
    assert data["deck"] == deck.id