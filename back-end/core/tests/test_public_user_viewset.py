import pytest
from rest_framework.test import APIClient
from django.urls import reverse


@pytest.mark.django_db
def test_create_user():
    """
    Test that the User API endpoint allows creating a new user.

    This test ensures that:
    1. A POST request with valid data to the "user-list" endpoint returns a 201 (Created) status.
    2. The response includes the submitted email, confirming persistence.
    3. The password field is not present in the response, maintaining security.
    """
    
    client = APIClient()

    url = reverse("user-list")
    payload = {
        "email": "test@mail.com",
        "username": "johhan",
        "password": "supersecret"
    }

    response = client.post(url,payload,format="json")

    assert response.status_code == 201
    data = response.json()
    assert data["email"] == payload["email"]
    assert "password" not in data #Password should not be exposed