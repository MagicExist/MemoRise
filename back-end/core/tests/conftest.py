import pytest
from django.core.files.uploadedfile import SimpleUploadedFile
from PIL import Image
import io
from django.urls import reverse
from rest_framework.test import APIClient

@pytest.fixture
def test_image():
    """
    Fixture that generates a temporary in-memory image file
    to be used as a fake profile picture in tests.

    The image is:
    - 100x100 pixels
    - Solid red color
    - Stored as a JPEG file
    - Returned as a SimpleUploadedFile, compatible with Django's FileField
    """
      
    file = io.BytesIO()
    image = Image.new("RGB", (100, 100), "red")  # 100x100 px red
    image.save(file, "JPEG")
    file.seek(0)
    return SimpleUploadedFile("test.jpg", file.read(), content_type="image/jpeg")


@pytest.fixture
def create_user(db):
    """
    Fixture that creates and returns a test user in the database.

    The user has:
    - Email: fixture@mail.com
    - Username: fixture
    - Password: supersecret

    This fixture ensures a consistent test user is available
    for API and model-related tests.
    """
    
    from core.models import User
    raw_password = "supersecret"
    user = User.objects.create_user(
        email="fixture@mail.com",
        username="fixture",
        password=raw_password
    )
    user.password = raw_password
    return user

@pytest.fixture
def get_token(create_user):
    """
    Fixture that authenticates the test user and returns a valid JWT access token.

    Workflow:
    1. Uses the `create_user` fixture to ensure a test user exists in the database.
    2. Sends a POST request to the `token_obtain_pair` endpoint with the user's credentials.
    3. Validates that the response status is 200 (successful authentication).
    4. Extracts and returns the JWT access token from the response JSON.

    Returns:
        str: A JWT access token string that can be used to authenticate
             subsequent API requests in tests.
    """

    client = APIClient()

    tokenUrl = reverse("token_obtain_pair")

    tokenPayload = {
        "email":create_user.email,
        "password":create_user.password
    }

    response = client.post(tokenUrl,tokenPayload,format="json")
    assert response.status_code == 200, response.content
    data = response.json()
    jwt_token = data["access"]
    return jwt_token