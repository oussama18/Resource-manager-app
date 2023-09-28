package com.example.recourcesmanager.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sun.jna.platform.win32.COM.IStream;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.mongodb.core.aggregation.ConvertOperators;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.*;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.OK;

@Slf4j
public class CustomAuthorization extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (request.getServletPath().equals("/api/login") || request.getServletPath().equals("/api/refresh")) {
            filterChain.doFilter(request, response);

        } else {

            String authorizationHeader = request.getHeader(AUTHORIZATION);
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                try {

                    String token = authorizationHeader.substring("Bearer ".length());
                    //    System.out.println(token.getBytes(StandardCharsets.UTF_8));
                    Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                    JWTVerifier verifier = JWT.require(algorithm).build();
                    DecodedJWT decodedJWT = verifier.verify(token);
                    String username = decodedJWT.getSubject();
                    System.out.println(username);
                    String[] roles = decodedJWT.getClaim("roles").asArray(String.class);
                    Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
                    Arrays.stream(roles).forEach(role -> {
                        authorities.add(new SimpleGrantedAuthority(role));
                        System.out.println(role);
                    });
                    UsernamePasswordAuthenticationToken authenticationToken =
                            new UsernamePasswordAuthenticationToken(username,null, authorities);
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    System.out.println(SecurityContextHolder.getContext().getAuthentication());
                    response.setStatus(OK.value());
                    filterChain.doFilter(request, response);
                } catch (Exception e) {
                    log.error("Error logging in : {}", e.getMessage());
                    Map<String, String> errors = new HashMap<>();
                    errors.put("erreur", e.getMessage());
                    response.setContentType("application/json");
                    response.setStatus(FORBIDDEN.value());
                    new ObjectMapper().writeValue(response.getOutputStream(), errors);

                }
            } else {
                filterChain.doFilter(request, response);

            }


        }
    }

}
