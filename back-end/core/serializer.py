from rest_framework import serializers
from .models import User

#Creating a user serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        extra_kwargs = {'password':{'write_only':True}}

    #We need override to use Django create_user method to hash the password
    def create(self, validated_data):
        email = validated_data.pop("email")
        password = validated_data.pop("password")
        user = User.objects.create_user(
            email=email,
            password=password,
            **validated_data
        )
        return user