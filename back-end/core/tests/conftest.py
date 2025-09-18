import pytest
from django.core.files.uploadedfile import SimpleUploadedFile
from PIL import Image
import io

#We need a fixture to create a fake profile photo to implement in tests
@pytest.fixture
def test_image():
    file = io.BytesIO()
    image = Image.new("RGB", (100, 100), "red")  # 100x100 px red
    image.save(file, "JPEG")
    file.seek(0)
    return SimpleUploadedFile("test.jpg", file.read(), content_type="image/jpeg")


@pytest.fixture
def create_user(db):
    from core.models import User
    return User.objects.create_user(
        email="fixture@mail.com",
        username="fixture",
        password="supersecret"
    )