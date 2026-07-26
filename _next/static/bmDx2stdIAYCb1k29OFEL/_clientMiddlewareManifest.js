self.__MIDDLEWARE_MATCHERS = [
  {
    "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/((?!_next|favicon\\.ico|favicon-.*\\.png|apple-touch-icon\\.png|android-chrome-.*\\.png|site\\.webmanifest|sitemap\\.xml|robots\\.txt|PontLook-Logo\\.png|logo-white\\.png|skyline-bg\\.jpg|skyline-bg\\.webp|og-image\\.png|api).*))(\\.json|\\.rsc|\\.segments\\/.+\\.segment\\.rsc)?[\\/#\\?]?$",
    "originalSource": "/((?!_next|favicon\\.ico|favicon-.*\\.png|apple-touch-icon\\.png|android-chrome-.*\\.png|site\\.webmanifest|sitemap\\.xml|robots\\.txt|PontLook-Logo\\.png|logo-white\\.png|skyline-bg\\.jpg|skyline-bg\\.webp|og-image\\.png|api).*)"
  }
];self.__MIDDLEWARE_MATCHERS_CB && self.__MIDDLEWARE_MATCHERS_CB()