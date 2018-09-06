import re

from django.conf import settings
from django.core.cache import cache
from django.utils.deprecation import MiddlewareMixin


class CachingMiddleware(MiddlewareMixin):
    """Takes urls from the settings files and caches them"""

    def __init__(self, get_response):
        # One-time configuration and initialization.
        self.get_response = get_response
        self.cache_urls = settings.CACHE_URLS

    def process_response(self, request, response):
        """
        Check whether the page is already cached and return the cached
        version if available.
        """
        if request.method not in ('GET'):
            return response  # Don't bother checking the cache.

        url_path = request.path

        print("URL is %s" % url_path)

        cached_url = self.get_cache(url_path)

        if cached_url:  # check if path exists in cache url setting
            cache_timeout = cached_url[1]
            if cache.get(url_path) is None:  # check if path exists in cache
                is_cached = cache.add(url_path, response, cache_timeout)  # add a key only if it doesn’t already exist
                print("Was %s cached %s" % (url_path, is_cached))
            else:
                response = cache.get(url_path)  # cache key exist, retrieve from cache
                print("Getting value from cache %s" % response)

        return response

    def get_cache(self, cache_key):
        """Check if the url path exists in CACHE_URLS settings"""
        for cached_url in self.cache_urls:
            if cache_key == cached_url[0]:
                return cached_url

        return None
