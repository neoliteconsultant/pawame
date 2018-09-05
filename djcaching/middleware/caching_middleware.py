from django.conf import settings
from django.core.cache import caches
from django.utils.deprecation import MiddlewareMixin


class CachingMiddleware(MiddlewareMixin):
    """Takes urls from the settings files and caches them"""

    def __init__(self, get_response):
        # One-time configuration and initialization.
        self.get_response = get_response
        self.cache_urls = settings.CACHE_URLS

    def process_response(self, request, response):
        url_path = request.path

        print("url path is %s" % url_path)

        cached_url = self.get_cache(url_path)

        if cached_url:  # check if path exists in cache url setting
            cache_timeout = cached_url[1]
            self.cache.set(url_path, response, cache_timeout)
        return response

    def get_cache(self, cache_key):
        for cached_url in self.cached_urls:
            if cache_key == cached_url[0]:
                return cached_url

        return None
