from rest_framework import serializers
from .models import User

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


#Creating a user serializer
class PublicUserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'confirm_password' ,'username', 'profile_picture', 'base_ease_factor']
        extra_kwargs = {
            'email': {'required': True},
            'username': {'required': True},
            'password':{'write_only':True}
            }
    
    def validate(self, data):
        """
        Validate that the `password` and `confirm_password` fields match.

        This method is automatically called during serializer validation.
        It ensures that a user cannot register with mismatched passwords.
        If the two fields are not identical, it raises a ValidationError
        attached specifically to the `confirm_password` field, returning
        a clear message to the client about the mismatch.

        Args:
            data (dict): The validated serializer data containing
                        'password' and 'confirm_password'.

        Returns:
            dict: The same data if validation passes (passwords match).

        Raises:
            serializers.ValidationError: If `password` and `confirm_password`
                                        do not match.
        """
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError(
                {"confirm_password" : "Passwords do not match."}
            )
        return data


    #We need override to use Django create_user method to hash the password
    def create(self, validated_data):
        validated_data.pop("confirm_password")
        email = validated_data.pop("email")
        password = validated_data.pop("password")
        user = User.objects.create_user(
            email=email,
            password=password,
            **validated_data
        )
        return user
    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = "email"   # now it expects email

    def validate(self, attrs):
        data = super().validate(attrs)
        data["user"] = {
            "id": self.user.id,
            "email": self.user.email,
        }
        return data
