package com.click_pick.dto;

import com.click_pick.entity.Creneau;

/** Créneau de retrait (US07). Un créneau "complet" ne doit pas être sélectionnable. */
public record CreneauResponse(Long id, String date, String heure, int capaciteMax, int placesPrises,
                              int placesRestantes, boolean complet) {

    public static CreneauResponse from(Creneau c) {
        return new CreneauResponse(c.getId(), c.getDateCreneau().toString(), c.getHeure(),
                c.getCapaciteMax(), c.getPlacesPrises(), c.placesRestantes(), c.placesRestantes() == 0);
    }
}
