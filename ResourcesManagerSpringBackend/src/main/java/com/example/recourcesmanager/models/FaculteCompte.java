package com.example.recourcesmanager.models;

import com.example.recourcesmanager.DTO.ViewCompte;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.*;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

/**
 * @author PC
 * @version 1.0
 * @created 23-mars-2022 22:06:44
 */
@Document(collection = "compte")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FaculteCompte extends AbstractCompte {

    @NotNull
    @Size(max = 50)
    @JsonView({ViewCompte.CompteResponse.class})
    private String Password;

    private Set<CompteRole> roles = new HashSet<>();

    @NotNull
    @Indexed(unique = true)
    @JsonView({ViewCompte.CompteResponse.class})
    private String userName;

    public FaculteCompte(Personne m_Personne, String password, Set<CompteRole> roles, String user_name) {
        super(m_Personne);
        Password = password;
        this.roles = roles;
        this.userName = user_name;
    }
}