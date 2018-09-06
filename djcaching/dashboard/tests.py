from django.core.cache import cache
from django.test import TestCase


# Create your tests here.
class DashboardTests(TestCase):
    def setUp(self):
        self.dashboard_url = '/dashboard'
        self.landing_url = '/landing'
        self.home_url = '/'

    def test_home(self):
        response = self.client.get(self.home_url)
        self.assertEqual(response.status_code, 200)

    def test_dashboard(self):
        response = self.client.get(self.dashboard_url)
        self.assertEqual(response.status_code, 200)

    def test_landing_page(self):
        response = self.client.get(self.landing_url)
        self.assertEqual(response.status_code, 200)


class CachedDashboardTests(TestCase):
    """Test for cached urls"""
    def setUp(self):
        self.dashboard_url = '/dashboard'
        self.landing_url = '/landing'
        self.home_url = '/'

    def test_home_caching(self):
        expected_response = self.client.get(self.dashboard_url).content
        cache_response = cache.get(self.dashboard_url).content
        self.assertEqual(expected_response, cache_response)

    def test_dashboard_caching(self):
        expected_response = self.client.get(self.dashboard_url).content
        cache_response = cache.get(self.dashboard_url).content
        self.assertEquals(expected_response, cache_response)

    def test_landing_caching(self):
        """Test for URL not added in CACHE_URL setting"""
        self.client.get(self.landing_url)
        cache_response = cache.get(self.landing_url)
        self.assertIsNone(cache_response)
