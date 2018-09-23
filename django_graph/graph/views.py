import random

from rest_framework.response import Response
from rest_framework.views import APIView


class RandomNumberGenerator(APIView):

    def get(self, request, format=None):
        numbers = []
        for x in range(10):
            number = random.randint(1, 101)
            numbers.append(number)

        return Response(numbers)
