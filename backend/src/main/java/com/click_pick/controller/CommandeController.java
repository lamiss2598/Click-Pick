package com.click_pick.controller;

import com.click_pick.dto.ApiResponse;
import com.click_pick.dto.CommandeRequest;
import com.click_pick.dto.CommandeResponse;
import com.click_pick.security.AuthUser;
import com.click_pick.security.RequireRole;
import com.click_pick.security.Role;
import com.click_pick.service.CommandeService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/** Passer commande (US08) : réservé aux clients. */
@RestController
@RequestMapping("/api/commandes")
@RequireRole(Role.CLIENT)
public class CommandeController {

    private final CommandeService commandeService;

    public CommandeController(CommandeService commandeService) {
        this.commandeService = commandeService;
    }

    /**
     * POST /api/commandes : valide le panier (paiement simulé en V1).
     * 201 + la commande (avec son numéro) ; 409 si le créneau est complet ; 400 si panier vide ou invalide.
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<CommandeResponse> creer(AuthUser user, @Valid @RequestBody CommandeRequest request) {
        CommandeResponse commande = commandeService.creer(user, request);
        return ApiResponse.ok("Paiement simulé accepté. Commande n°" + commande.numero() + " enregistrée", commande);
    }
}
