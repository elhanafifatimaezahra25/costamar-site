package com.costamar.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

/**
 * Exposes the CORS policy as a {@link CorsConfigurationSource} bean so it can
 * be wired directly into Spring Security's filter chain (see
 * SecurityConfig#filterChain). Spring Security evaluates authorization
 * *before* Spring MVC's own CORS handling runs, so a WebMvcConfigurer-only
 * setup lets preflight OPTIONS requests to authenticated endpoints
 * (/api/admin/**) get rejected pre-CORS — this bean is what makes
 * `.cors(...)` in HttpSecurity actually apply the policy below.
 */
@Configuration
public class CorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(List.of(
                "http://localhost:*",
                "https://*.pages.dev",
                "https://*.vercel.app",
                "https://costamar-hammam.com",
                "https://www.costamar-hammam.com"
        ));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        return source;
    }
}
