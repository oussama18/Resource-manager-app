package com.example.recourcesmanager.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.recourcesmanager.DTO.ViewCompte;
import com.example.recourcesmanager.models.AbstractRessource;
import com.example.recourcesmanager.models.FaculteCompte;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.gson.GsonAutoConfiguration;
import org.springframework.boot.autoconfigure.gson.GsonBuilderCustomizer;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;


@Slf4j
public class CustomAuthentificationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;

    public CustomAuthentificationFilter(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }


    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {


       System.out.println(request.getHeader("Content-Type"));
        LoginRequest loginRequest = this.getLoginRequest(request);
        log.info("username is : {}", loginRequest.getUsername());
        log.info("password is : {}", loginRequest.getPassword());
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginRequest.getUsername()
                , loginRequest.getPassword());

//        String username = request.getParameter("username");
//        String password = request.getParameter("password");
//        log.info("username is : {}", username);
//        log.info("password is : {}", password);
//        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
        return authenticationManager.authenticate(authenticationToken);
    }





    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) throws IOException, ServletException {

        User user = (User) authentication.getPrincipal();
        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
        System.out.println(user.getAuthorities());
        String access_token = JWT.create()
                .withSubject(user.getUsername()).withExpiresAt(new Date(System.currentTimeMillis() + 24298 * 60* 1000))
                .withIssuer(request.getRequestURL().toString()).withClaim("roles", user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList())).sign(algorithm);
        String refresh_token = JWT.create()
                .withSubject(user.getUsername()).withExpiresAt(new Date(System.currentTimeMillis() + 29000 * 60 * 1000))
                .withIssuer(request.getRequestURL().toString()).sign(algorithm);


        Map<String, String> tokens = new HashMap<>();
        tokens.put("access_token", access_token);
//        tokens.put("refresh_token", refresh_token);
        response.setContentType("application/json");
        new ObjectMapper().writeValue(response.getOutputStream(), tokens);

    }

    private LoginRequest getLoginRequest(HttpServletRequest request) {
        BufferedReader reader = null;
        LoginRequest loginRequest = null;
        try {
            reader = request.getReader();
            Gson gson = new Gson();
            loginRequest = gson.fromJson(reader, LoginRequest.class);
        } catch (IOException ex) {
            log.error("CustomUsernamePasswordAuthenticationFilter#getLoginRequest", ex);
        } finally {
            try {
                reader.close();
            } catch (IOException ex) {
                log.error("CustomUsernamePasswordAuthenticationFilter#getLoginRequest", ex);
            }
        }

        if (loginRequest == null) {
            loginRequest = new LoginRequest();
        }

        return loginRequest;
    }

    @Data
    private static class LoginRequest {

        String username;
        String password;

    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
//        super.unsuccessfulAuthentication(request, response, failed);
        String error="user not found";
        Map<String, String> errors = new HashMap<>();
        errors.put("error", error);
//        tokens.put("refresh_token", refresh_token);
        response.setContentType("application/json");
        new ObjectMapper().writeValue(response.getOutputStream(), errors);
    }

}

