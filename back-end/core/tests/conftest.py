import pytest
from django.core.files.uploadedfile import SimpleUploadedFile
from PIL import Image
import io

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
    return User.objects.create_user(
        email="fixture@mail.com",
        username="fixture",
        password="supersecret"
    )