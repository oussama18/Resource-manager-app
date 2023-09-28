package com.example.recourcesmanager.controllers;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.recourcesmanager.models.AbstractCompte;
import com.example.recourcesmanager.models.FaculteCompte;
import com.example.recourcesmanager.services.AccountManager.AccountService;
import com.example.recourcesmanager.services.AccountManager.AccountServiceImp;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.*;
import java.util.stream.Collectors;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;
import static org.springframework.http.HttpStatus.FORBIDDEN;

@RestController
@AllArgsConstructor
@CrossOrigin
@RequestMapping("/api/v1")
public class CompteController {

    private AccountService accountService;
    private AccountServiceImp accountServiceImp;

    @GetMapping("/comptes")
    public ResponseEntity<List<? extends AbstractCompte>>getComptes(){
        return ResponseEntity.ok().body(this.accountService.getAccounts());
    }

    @GetMapping("/compte/{username}")
    public ResponseEntity<AbstractCompte> getCompte(@PathVariable String username) {
        return ResponseEntity.ok().body(this.accountService.getAccount(username));
    }
    
    @PostMapping("/compte")
    public ResponseEntity<AbstractCompte>saveCompte(@RequestBody FaculteCompte compte){
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/compte").toUriString());
        return ResponseEntity.created(uri).body(accountService.saveCompte(compte));
    }

    @PutMapping("/compte")
    public ResponseEntity<AbstractCompte> updateCompte(@RequestBody FaculteCompte comtpe){

        return ResponseEntity.accepted().body(accountService.updateCompte(comtpe));
    }

    @DeleteMapping("/compte/{username}")
    public ResponseEntity<?> deleteCompte(@PathVariable String username) {
        boolean stat = this.accountService.deleteCompte(username);

        if (!stat) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        return ResponseEntity.ok().build();
    }


    // ! this function help us to refresh our token expired by creating a new access token

    @GetMapping("/refresh")
    public void refresh(HttpServletRequest request, HttpServletResponse response) throws IOException {

        String authorizationHeader = request.getHeader(AUTHORIZATION);
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            try {

                //? this one should be a refresh token

                String refresh_token = authorizationHeader.substring("Bearer ".length());
                Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
                JWTVerifier verifier = JWT.require(algorithm).build();
                DecodedJWT decodedJWT = verifier.verify(refresh_token);
                String comptename = decodedJWT.getSubject();
                User compte = (User) accountServiceImp.loadUserByUsername(comptename);
                String access_token = JWT.create()
                        .withSubject(compte.getUsername()).withExpiresAt(new Date(System.currentTimeMillis() + 70 * 60 * 1000))
                        .withIssuer(request.getRequestURL().toString()).withClaim("roles", compte.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList())).sign(algorithm);


                Map<String, String> tokens = new HashMap<>();
                tokens.put("access_token", access_token);
                tokens.put("refresh_token", refresh_token);
                response.setContentType("application/json");
                new ObjectMapper().writeValue(response.getOutputStream(), tokens);


            } catch (Exception e) {

                Map<String, String> errors = new HashMap<>();
                errors.put("erreur", e.getMessage());
                response.setContentType("application/json");
                response.setStatus(FORBIDDEN.value());
                new ObjectMapper().writeValue(response.getOutputStream(), errors);

            }
        }else{
            throw new RuntimeException("refresh token is missing");
        }
    }

}
