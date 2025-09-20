import pytest
from rest_framework.test import APIClient
from django.urls import reverse
from core.models import User


@pytest.mark.django_db
def test_user_registration():
    """
    This test verifies the full user registration and authentication flow:

    1. ✅ Registration:
       - Sends a POST request to the `user-list` endpoint with user data.
       - Asserts that exactly one user exists in the database after creation.

    2. 🔑 JWT Token Retrieval:
       - Sends a POST request to the `token_obtain_pair` endpoint with valid credentials.
       - Extracts the access token from the response.
       - Confirms the response status is 200 and that the returned user data matches the registered email.

    3. 🔒 Authenticated Request:
       - Configures the API client with the JWT access token in the `Authorization` header.
       - Sends a GET request to the `user-list` endpoint.
       - Asserts the request succeeds with a 200 status code, proving that protected endpoints are accessible with a valid token.
    """

    client = APIClient()

    userUrl = reverse("user-list")

    userPayload = {
        "email": "user@example.com",
        "password": "test123",
        "username": "test123",
    }

    client.post(userUrl,userPayload,format="json")

    assert User.objects.count() == 1

    tokenUrl = reverse("token_obtain_pair")

    tokenPayload = {
        "email":"user@example.com",
        "password":"test123"
    }

    response = client.post(tokenUrl,tokenPayload,format="json")
    data = response.json()
    jwt_token = data["access"]


    assert response.status_code == 200
    assert data["user"]["email"] == "user@example.com"

    client.credentials(HTTP_AUTHORIZATION=f'Bearer {jwt_token}')
    response = client.get(userUrl,format="json")

    assert response.status_code == 200

