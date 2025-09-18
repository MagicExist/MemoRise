import pytest
from core.serializer import PublicUserSerializer
from core.models import User
from django.test import override_settings
import tempfile
from django.core.files.uploadedfile import SimpleUploadedFile

@pytest.mark.django_db
@override_settings(MEDIA_ROOT=tempfile.gettempdir())
def test_user_serializer_create(test_image):
    """
    Test that UserSerializer correctly creates a new User:
    - Validates provided data (including image field).
    - Persists the user in the test database.
    - Ensures only one user exists after creation.
    - Confirms profile_picture is stored.
    - Verifies password is hashed and not saved in plain text.
    """

    #fake api data
    data = {
        "email": "test@mail.com",
        "username": "John Doe",
        "profile_picture": test_image,
        "password": "supersecret"
    }

    serializer = PublicUserSerializer(data=data)

    #If the data is valid pass, if not show serializer errors
    assert serializer.is_valid(), serializer.errors
    #save user objet into a fake database
    user = serializer.save()

    assert User.objects.count() == 1
    assert user.profile_picture  
    #We validate if the password was hashed
    assert user.check_password("supersecret")
