import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from core.models import Deck, User

@pytest.mark.django_db
def test_authenticated_user_can_create_deck(create_user, get_token):
    """
    Authenticated users should be able to create a deck.
    """
    client = APIClient()
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {get_token}")

    url = reverse("deck-list")
    payload = {
        "title": "Networking Deck",
        "description": "OSI Layers",
        "color": "#9333EA"
    }

    response = client.post(url, payload, format="json")
    assert response.status_code == 201  # Created
    data = response.json()

    deck = Deck.objects.get(id=data["id"])
    assert deck.user == create_user
    assert deck.title == "Networking Deck"

@pytest.mark.django_db
def test_user_only_sees_their_own_decks(get_token):
    """
    A user should only see their own decks (if get_queryset filters by request.user).
    """
    other_user = User.objects.create_user(
        email="other@mail.com", username="other", password="secret"
    )
    Deck.objects.create(user=other_user, title="Other Deck", description="Not yours")

    client = APIClient()
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {get_token}")

    url = reverse("deck-list")
    response = client.get(url)

    assert response.status_code == 200
    data = response.json()
    assert all(deck["title"] != "Other Deck" for deck in data)