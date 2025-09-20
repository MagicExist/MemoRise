import pytest
from rest_framework.test import APIClient
from django.urls import reverse
from core.models import User


@pytest.mark.django_db
def test_user_registration():

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
    
